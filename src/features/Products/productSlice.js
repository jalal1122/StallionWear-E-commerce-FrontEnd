import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

// initial state for the product slice
const initialState = {
  products: [],
  product: null,
  newArrivals: JSON.parse(localStorage.getItem("newArrivals")) || [],
  topSelling: JSON.parse(localStorage.getItem("topSelling")) || [],
  totalPages: JSON.parse(localStorage.getItem("totalPages")) || 0,
  currentPage: JSON.parse(localStorage.getItem("currentPage")) || 1,
  itemsPerPage: 10,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// get new Arrivals Products
export const getNewArrivals = createAsyncThunk(
  "products/getNewArrivals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getNewArrivals();
      console.log("New Arrivals fetched successfully:", response);

      console.log(response.data[0].images[0]);

      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// get the top selling products
export const getTopSelling = createAsyncThunk(
  "products/getTopSelling",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getTopSelling();
      console.log("Top Selling fetched successfully:", response);

      console.log(response.data[0].images[0]);

      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// get all products
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (filter, { rejectWithValue }) => {
    try {
      const response = await productService.getAllProducts(filter);
      console.log("All Products fetched successfully:", response);

      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// get the product by id
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productService.getProductById(id);
      console.log("Product fetched successfully:", response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// define the product slice
const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.newArrivals = null;
      state.topSelling = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    
      // Handle the getNewArrivals action
      .addCase(getNewArrivals.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getNewArrivals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newArrivals = action.payload.data;
      })
      .addCase(getNewArrivals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Handle the getTopSelling action
      .addCase(getTopSelling.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getTopSelling.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.topSelling = action.payload.data;
      })
      .addCase(getTopSelling.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Handle the getAllProducts action
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.data.products;
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.data.currentPage;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Handle the getProductById action
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload.data;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProducts } = productSlice.actions;

export default productSlice.reducer;
