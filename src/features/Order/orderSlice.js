import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "./orderService.js";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  shippingCharge: 0,
  totalAmount: 0,
  finalAmount: 0,
  discount: 0,
  notes: "",
  loading: false,
  error: null,
  isSuccess: false,
};

export const createOrder = createAsyncThunk(
  "api/order",
  async ({ items, billingInfo, payment }, { rejectWithValue }) => {
    try {
      const response = await orderService.createOrder({
        items,
        billingInfo,
        payment,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderItems = [];
      state.shippingAddress = {};
      state.paymentMethod = "";
      state.shippingCharge = 0;
      state.totalAmount = 0;
      state.finalAmount = 0;
      state.discount = 0;
      state.notes = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        console.log("Order created successfully:", action.payload);

        state.orderItems = action.payload.orderItems;
        state.shippingAddress = action.payload.shippingAddress;
        state.paymentMethod = action.payload.paymentMethod;
        state.shippingCharge = action.payload.shippingCharge;
        state.totalAmount = action.payload.totalAmount;
        state.finalAmount = action.payload.finalAmount;
        state.discount = action.payload.discount;
        state.notes = action.payload.notes;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
