import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

// ✅ 上传图片到 Cloudinary，返回 URL
const uploadProductImage = createAsyncThunk(
  "adminProducts/uploadProductImage",
  async (imageFile) => {
    const formData = new FormData();
    formData.append("my_file", imageFile);

    const response = await axios.post(
      "http://localhost:8000/api/admin/products/upload-image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response?.data?.result?.secure_url;
  }
);

// ✅ 添加商品
const addNewProduct = createAsyncThunk(
  "adminProducts/addNewProduct",
  async ({ formData, imageUrl }) => {
    const response = await axios.post(
      "http://localhost:8000/api/admin/products/add",
      { ...formData, image: imageUrl },
      { headers: { "Content-Type": "application/json" } }
    );

    return response?.data;
  }
);

// ✅ 编辑商品
const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, formData, imageUrl }) => {
    const updatedData = imageUrl ? { ...formData, image: imageUrl } : formData;

    const response = await axios.put(
      `http://localhost:8000/api/admin/products/edit/${id}`,
      updatedData,
      { headers: { "Content-Type": "application/json" } }
    );

    return response?.data;
  }
);

// ✅ 删除商品
const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:8000/api/admin/products/delete/${id}`
    );

    return response?.data;
  }
);

// ✅ 获取所有商品
const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAllProducts",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/admin/products/get"
    );

    return response?.data;
  }
);

// ✅ Slice
const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.data || [];
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

// ✅ 导出异步方法
export {
  addNewProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  fetchAllProducts,
};

// ✅ 默认导出 reducer
export default AdminProductsSlice.reducer;
