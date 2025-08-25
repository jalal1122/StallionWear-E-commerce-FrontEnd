import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "./wishlistService.js";

const initialState = {
  wishlistProducts: [],
  loading: false, // Fixed: Changed from isLoading to loading
  success: false, // Fixed: Changed from isSuccess to success
  error: null, // Fixed: Changed from isError to error (and made it null instead of boolean)
  message: "",
};

// Fixed: Renamed to match component usage
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, thunkAPI) => {
    try {
      const response = await wishlistService.getWishlist();
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

export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async ({ productId, size, color }, thunkAPI) => {
    try {
      const response = await wishlistService.addToWishlist(
        productId,
        size,
        color
      );
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

export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async ({ productId, size, color }, thunkAPI) => {
    try {
      const response = await wishlistService.removeFromWishlist(
        productId,
        size,
        color
      );
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

export const moveToCart = createAsyncThunk(
  "api/wishlist/moveToCart",
  async ({ productId, size, color }, thunkAPI) => {
    try {
      return await wishlistService.moveToCart(productId, size, color);
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

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
    // Added: Clear error state
    clearError: (state) => {
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist (Fixed: Updated action names)
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.wishlistProducts = action.payload.data.wishlist;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
        state.items = []; // Reset items on error
      })

      // Add to Wishlist
      .addCase(addWishlistItem.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items = action.payload.data || action.payload || [];
      })
      .addCase(addWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
      })

      // Remove from Wishlist
      .addCase(removeWishlistItem.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.wishlistProducts = state.wishlistProducts.filter(
          (item) =>
            item.product._id !== action.payload.data.removedItem.productId
        );
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
      })

      // Move to Cart
      .addCase(moveToCart.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.wishlistProducts = state.wishlistProducts.filter(
          (item) => item.product._id !== action.payload.data.movedItem.productId
        );
      })
      .addCase(moveToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
      });
  },
});

export const { reset, clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
