import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

// 游客购物车本地存储键
const GUEST_CART_KEY = "guestCart";

// 获取游客购物车
const getGuestCart = () => {
  try {
    const guestCart = localStorage.getItem(GUEST_CART_KEY);
    return guestCart ? JSON.parse(guestCart) : [];
  } catch (error) {
    console.error("Error getting guest cart:", error);
    return [];
  }
};

// 保存游客购物车
const saveGuestCart = (cartItems) => {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving guest cart:", error);
  }
};

// 清除游客购物车
const clearGuestCart = () => {
  try {
    localStorage.removeItem(GUEST_CART_KEY);
  } catch (error) {
    console.error("Error clearing guest cart:", error);
  }
};

// 添加到购物车（支持游客和用户）
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    if (!userId) {
      // 游客模式 - 使用本地存储
      const guestCart = getGuestCart();
      const existingItemIndex = guestCart.findIndex(item => item.productId === productId);
      
      if (existingItemIndex > -1) {
        // 更新数量
        guestCart[existingItemIndex].quantity += quantity;
      } else {
        // 添加新商品（注意：这里需要获取商品详情）
        const response = await axios.get(`http://localhost:8000/api/shop/products/get/${productId}`);
        const product = response.data.data;
        
        guestCart.push({
          productId,
          quantity,
          ...product, // 包含商品的完整信息
        });
      }
      
      saveGuestCart(guestCart);
      return { success: true, data: { items: guestCart } };
    } else {
      // 用户模式 - 使用服务器
      const response = await axios.post(
        "http://localhost:8000/api/shop/cart/add",
        {
          userId,
          productId,
          quantity,
        }
      );
      return response.data;
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    if (!userId) {
      // 游客模式 - 从本地存储获取
      const guestCart = getGuestCart();
      return { success: true, data: { items: guestCart } };
    } else {
      // 用户模式 - 从服务器获取
      const response = await axios.get(
        `http://localhost:8000/api/shop/cart/get/${userId}`
      );
      return response.data;
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    if (!userId) {
      // 游客模式 - 从本地存储删除
      const guestCart = getGuestCart();
      const updatedCart = guestCart.filter(item => item.productId !== productId);
      saveGuestCart(updatedCart);
      return { success: true, data: { items: updatedCart } };
    } else {
      // 用户模式 - 从服务器删除
      const response = await axios.delete(
        `http://localhost:8000/api/shop/cart/${userId}/${productId}`
      );
      return response.data;
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    if (!userId) {
      // 游客模式 - 更新本地存储
      const guestCart = getGuestCart();
      const itemIndex = guestCart.findIndex(item => item.productId === productId);
      
      if (itemIndex > -1) {
        if (quantity <= 0) {
          // 如果数量为0或负数，删除商品
          guestCart.splice(itemIndex, 1);
        } else {
          guestCart[itemIndex].quantity = quantity;
        }
      }
      
      saveGuestCart(guestCart);
      return { success: true, data: { items: guestCart } };
    } else {
      // 用户模式 - 更新服务器
      const response = await axios.put(
        "http://localhost:8000/api/shop/cart/update-cart",
        {
          userId,
          productId,
          quantity,
        }
      );
      return response.data;
    }
  }
);

// 合并游客购物车到用户购物车
export const mergeGuestCartToUser = createAsyncThunk(
  "cart/mergeGuestCartToUser",
  async (userId) => {
    const guestCart = getGuestCart();
    
    if (guestCart.length === 0) {
      // 如果游客购物车为空，直接获取用户购物车
      const response = await axios.get(
        `http://localhost:8000/api/shop/cart/get/${userId}`
      );
      return response.data;
    }
    
    // 将游客购物车中的每个商品添加到用户购物车
    for (const item of guestCart) {
      await axios.post("http://localhost:8000/api/shop/cart/add", {
        userId,
        productId: item.productId,
        quantity: item.quantity,
      });
    }
    
    // 清除游客购物车
    clearGuestCart();
    
    // 获取合并后的用户购物车
    const response = await axios.get(
      `http://localhost:8000/api/shop/cart/get/${userId}`
    );
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    // 清除游客购物车
    clearGuestCartState: (state) => {
      clearGuestCart();
      state.cartItems = [];
    },
    // 初始化游客购物车
    initializeGuestCart: (state) => {
      if (!state.cartItems || !state.cartItems.items || state.cartItems.items.length === 0) {
        const guestCart = getGuestCart();
        state.cartItems = { items: guestCart };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(mergeGuestCartToUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(mergeGuestCartToUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(mergeGuestCartToUser.rejected, (state) => {
        state.isLoading = false;
        // 保持当前购物车状态
      });
  },
});

export const { clearGuestCartState, initializeGuestCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
