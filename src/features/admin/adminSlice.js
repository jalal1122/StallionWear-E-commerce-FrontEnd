import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminService } from "./adminService.js";

// initalial State Structure
const initialState = {
  updatedOrder: null,
  allOrders: null,
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
      });
  },
});

// exports
export const { reset } = adminSlice.actions;

export default adminSlice.reducer;
