import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderService.js";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  shippingCharge: 0,
  totalAmount: 0,
  finalAmount: 0,
  discount: 0,
  notes: "",
};

export const createOrder = createAsyncThunk(
  "api/order",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await createOrder(orderData);
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
  extraReducers: {},
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
