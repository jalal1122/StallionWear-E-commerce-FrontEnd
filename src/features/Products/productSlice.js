import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

// initial state for the product slice
const initialState = {
  products: [],
  newArrivals: JSON.parse(localStorage.getItem("newArrivals")) || [],
  topSelling: JSON.parse(localStorage.getItem("topSelling")) || [],
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
      });
  },
});

export const { resetProducts } = productSlice.actions;

export default productSlice.reducer;
