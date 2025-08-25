import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersService } from "./ordersService.js";

const initialState = {
  orders: [],
  totalOrders: 0,
  totalPages: 0,
  currentPage: 0,
  orderbyId: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
  isSuccess: false,
};

export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (params = {}, thunkAPI) => {
    try {
      const { currentPage, orderStatus } = params;
      const response = await ordersService.getUserOrders(
        currentPage,
        orderStatus
      );
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

export const getOrderbyId = createAsyncThunk(
  "orders/getOrderbyId",
  async (orderId, thunkAPI) => {
    try {
      const response = await ordersService.getOrderbyId(orderId);
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

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, thunkAPI) => {
    try {
      const response = await ordersService.cancelOrder(orderId);
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

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.orders = [];
      state.totalOrders = 0;
      state.totalPages = 0;
      state.currentPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder

      // Get User Orders
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = "";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.totalPages = action.payload.totalPages;
        state.currentPage = parseInt(action.payload.currentPage);
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })

      // Get Order by Id
      .addCase(getOrderbyId.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getOrderbyId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = "";
        state.orderbyId = action.payload;
      })
      .addCase(getOrderbyId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset: resetOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
