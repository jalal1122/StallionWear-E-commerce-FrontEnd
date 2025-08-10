import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService.js";

const initialState = {
  items: [],
  success: false,
  loading: false,
  error: null,
  message: "",
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(item);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromCart(itemId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCartItems();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Item added to cart successfully";
        state.items = action.payload.data.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Item removed from cart successfully";
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      })
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Cart items fetched successfully";
        state.items = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      });
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
