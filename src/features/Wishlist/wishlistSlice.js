import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js";


const userId = "" // Replace with actual user ID logic

const WISHLIST_ENDPOINT = `api/wishlist`;

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const response = await axios.get(`${WISHLIST_ENDPOINT}/${userId}`);
    return response.data;
  }
);

export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async (item) => {
    const response = await axios.post(`${WISHLIST_ENDPOINT}/${userId}`, item);
    return response.data;
  }
);

export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async (itemId) => {
    const response = await axios.delete(`${WISHLIST_ENDPOINT}/${userId}/${itemId}`);
    return response.data;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
    initialState: {
        items: [],
        status: "idle",
        loading: false,
        error: null,
    },
    reducers: {
        clearWishlist: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder 
          .addCase(fetchWishlist.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchWishlist.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
          })
          .addCase(fetchWishlist.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(addWishlistItem.fulfilled, (state, action) => {
                state.items = action.payload;
          })
          .addCase(removeWishlistItem.fulfilled, (state, action) => {
            state.items = action.payload
          })
    }

});

export default wishlistSlice.reducer;
