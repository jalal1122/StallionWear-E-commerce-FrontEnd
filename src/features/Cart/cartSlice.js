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
  async ({ productId, size, color }, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(productId, size, color);
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
      const response = await cartService.decrementCartItems( productId, size, color);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const incrementCartItems = createAsyncThunk(
  "cart/incrementCartItems",
  async ({productId, size, color}, { rejectWithValue}) => {
    try {
      const response = await cartService.incrementCartItems(productId, size, color);
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
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
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      })
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
      .addCase(decrementCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(decrementCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Cart item decremented successfully";
         console.log(action.payload.data)
      })
      .addCase(decrementCartItems.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      })
      .addCase(incrementCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(incrementCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Cart item incremented successfully";
       console.log(action.payload.data)
       state.items = state.items.map(
        (item) => {
          if( item.product._id === action.payload.data.updatedItem.productId ){
            item.quantity = action.payload.data.updatedItem.newQuantity

          }
          
        }
       )
      })
      .addCase(incrementCartItems.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      });
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
