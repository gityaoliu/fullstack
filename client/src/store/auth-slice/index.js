import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null, // { id, email, userName, role }
};

// 注册
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

// 登录
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { dispatch }) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      formData,
      { withCredentials: true }
    );
    
    // 如果登录成功，触发购物车合并
    if (response.data.success && response.data.user) {
      // 动态导入避免循环依赖
      const { mergeGuestCartToUser } = await import("../shop/cart-slice");
      dispatch(mergeGuestCartToUser(response.data.user.id));
    }
    
    return response.data;
  }
);

// 登出
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { dispatch }) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    
    // ✅ 清除 localStorage
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    
    // 登出后初始化游客购物车
    const { initializeGuestCart } = await import("../shop/cart-slice");
    dispatch(initializeGuestCart());
    
    return response.data;
  }
);

// 验证身份
export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    
    return response.data;
  }
);

// 修改密码
export const updatePassword = createAsyncThunk(
  "/auth/update-password",
  async (formData) => {
    const response = await axios.put(
      "http://localhost:8000/api/auth/update-password",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 注册
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // 登录
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.success) {
          const user = action.payload.user;
          state.user = user;
          state.isAuthenticated = true;

          // ✅ 存入 localStorage（可选但推荐）
          localStorage.setItem("userRole", user.role);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userName", user.userName);
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // 校验身份
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // 登出
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // 修改密码
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
