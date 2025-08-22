import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminService } from "./adminService.js";

// initalial State Structure
const initialState = {
  updatedOrder: null,
  allOrders: null,
  analyticsData: null,
  // Product management
  products: [],
  selectedProduct: null,
  totalPages: JSON.parse(localStorage.getItem("adminTotalPages")) || 1,
  currentPage: JSON.parse(localStorage.getItem("adminCurrentPage")) || 1,
  totalProducts: 0,
  isLoading: false,
  isError: false,
  errorMessage: null,
  isSuccess: false,
};

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async (orderData, thunkAPI) => {
    try {
      const response = await adminService.updateOrderStatus(orderData);
      console.log(response.data);

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (filter, thunkApi) => {
    try {
      const response = await adminService.getAllOrders(filter ? filter : {});
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getAnalytics = createAsyncThunk(
  "admin/getAnalytics",
  async (period, thunkAPI) => {
    try {
      const response = await adminService.getAnalytics(period);
      console.log(response.data);

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Product Management Async Thunks
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await adminService.createProduct(productData);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ productId, productData }, thunkAPI) => {
    try {
      const response = await adminService.updateProduct({
        productId,
        productData,
      });
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await adminService.deleteProduct(productId);
      return { productId, ...response };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "admin/getAllProducts",
  async (filters = {}, thunkAPI) => {
    try {
      const response = await adminService.getAllProducts(filters);
      console.log("Admin getAllProducts response:", response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice Difinition
const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.updatedOrder = null;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = null;
      state.isSuccess = false;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updatedOrder = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = true;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isSuccess = false;
      })

      //   Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = true;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isSuccess = false;
      })

      //   get analytics
      .addCase(getAnalytics.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = false;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.analyticsData = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = true;
      })
      .addCase(getAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isSuccess = false;
      })

      // Product Management Cases
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.data);
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isSuccess = false;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.data;
        const index = state.products.findIndex(
          (p) => p._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        state.selectedProduct = updatedProduct;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isSuccess = false;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload.productId;
        state.products = state.products.filter((p) => p._id !== productId);
        if (state.selectedProduct?._id === productId) {
          state.selectedProduct = null;
        }
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isSuccess = false;
      })

      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.data.products;
        console.log(
          "Admin All Products fetched successfully:",
          action.payload.data.products
        );

        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.data.currentPage;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isSuccess = false;
      });
  },
});

// exports
export const { reset, clearSelectedProduct, setSelectedProduct } =
  adminSlice.actions;

export default adminSlice.reducer;
