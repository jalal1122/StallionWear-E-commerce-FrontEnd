import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewsService from "./reviewsService";

// Initial state
const initialState = {
  // Orders to review
  ordersToReview: [],
  reviewableProducts: [],
  totalOrders: 0,
  totalReviewableProducts: 0,

  // Product reviews
  productReviews: [],
  reviewsPagination: {
    currentPage: 1,
    totalPages: 1,
    totalReviews: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  ratingDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },

  // UI state
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Get orders that are delivered and available for review
export const getOrdersToReview = createAsyncThunk(
  "reviews/getOrdersToReview",
  async (_, thunkAPI) => {
    try {
      const response = await reviewsService.getOrdersToReview();
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

// Submit a review for a product
export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async (reviewData, thunkAPI) => {
    try {
      const response = await reviewsService.submitReview(reviewData);
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

// Get reviews for a specific product
export const getProductReviews = createAsyncThunk(
  "reviews/getProductReviews",
  async ({ productId, options }, thunkAPI) => {
    try {
      const response = await reviewsService.getProductReviews(
        productId,
        options
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

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    clearProductReviews: (state) => {
      state.productReviews = [];
      state.reviewsPagination = initialState.reviewsPagination;
      state.ratingDistribution = initialState.ratingDistribution;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get orders to review
      .addCase(getOrdersToReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getOrdersToReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ordersToReview = action.payload.data.orders || [];
        state.reviewableProducts = action.payload.data.reviewableProducts || [];
        state.totalOrders = action.payload.data.totalOrders || 0;
        state.totalReviewableProducts =
          action.payload.data.totalReviewableProducts || 0;
      })
      .addCase(getOrdersToReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Submit review
      .addCase(submitReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Review submitted successfully!";

        // Remove the reviewed product from reviewable products
        const reviewData = action.meta.arg;
        state.reviewableProducts = state.reviewableProducts.filter(
          (product) =>
            !(
              product.product._id === reviewData.productId &&
              product.orderId === reviewData.orderId
            )
        );
        state.totalReviewableProducts = Math.max(
          0,
          state.totalReviewableProducts - 1
        );
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get product reviews
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productReviews = action.payload.data.reviews || [];
        state.reviewsPagination =
          action.payload.data.pagination || initialState.reviewsPagination;
        state.ratingDistribution =
          action.payload.data.ratingDistribution ||
          initialState.ratingDistribution;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearProductReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
