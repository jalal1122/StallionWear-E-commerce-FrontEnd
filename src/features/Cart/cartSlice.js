import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService.js";

const initialState = {
  items: [],
  cartSummary: [],
  success: false,
  loading: false,
  error: null,
  message: "",
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, size, color, price }, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(
        productId,
        size,
        color,
        price
      );
      console.log(response);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, size, color }, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromCart(productId, size, color);
      console.log(response);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCartItems();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const decrementCartItems = createAsyncThunk(
  "cart/decrementCartItems",
  async ({ productId, size, color }, { rejectWithValue }) => {
    try {
      const response = await cartService.decrementCartItems(
        productId,
        size,
        color
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const incrementCartItems = createAsyncThunk(
  "cart/incrementCartItems",
  async ({ productId, size, color }, { rejectWithValue }) => {
    try {
      const response = await cartService.incrementCartItems(
        productId,
        size,
        color
      );
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "api/cart/clear",
  async (_, thunkApi) => {
    try {
      const response = await cartService.clearCart();
      console.log(response);
      
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Add to Cart
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

      // Remove from the cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Item removed from cart successfully";
        state.items = state.items.filter(
          (item) =>
            item.product._id !== action.payload.data.removedItem.productId
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      })

      // get the cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Cart items fetched successfully";
        state.items = action.payload.data.cart;
        state.cartSummary = action.payload.data.cartSummary;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      })

      // Decrement the cart item
      .addCase(decrementCartItems.pending, (state) => {
        state.loading = false;
      })
      .addCase(decrementCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Cart item decremented successfully";
        console.log(action.payload.data);
        state.items = state.items.map((item) => {
          if (item.product._id === action.payload.data.updatedItem.productId) {
            item.quantity = action.payload.data.updatedItem.newQuantity;
          }
          return item;
        });
      })
      .addCase(decrementCartItems.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      })

      // Incremet the cart item
      .addCase(incrementCartItems.pending, (state) => {
        state.loading = false;
      })
      .addCase(incrementCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Cart item incremented successfully";
        console.log(action.payload.data);
        state.items = state.items.map((item) => {
          if (item.product._id === action.payload.data.updatedItem.productId) {
            item.quantity = action.payload.data.updatedItem.newQuantity;
          }
          return item;
        });
      })
      .addCase(incrementCartItems.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      })

      // Clear the cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.message = "Cart cleared successfully";
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      });
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
