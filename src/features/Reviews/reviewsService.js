import api from "../../utils/axios";

// Get orders that are delivered and available for review
const getOrdersToReview = async () => {
  try {
    console.log("Fetching orders to review...");
    const response = await api.get("/api/review/orders");
    console.log("Orders to review response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders to review:", error);
    throw error;
  }
};

// Submit a review for a product
const submitReview = async (reviewData) => {
  try {
    const { productId, orderId, rating, comment } = reviewData;

    console.log("Submitting review:", { productId, orderId, rating, comment });

    const response = await api.post("/api/review/add", {
      productId,
      orderId,
      rating,
      comment,
    });

    console.log("Submit review response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

// Get reviews for a specific product with pagination
const getProductReviews = async (productId, options = {}) => {
  try {
    const { page = 1, limit = 10, rating } = options;

    let url = `/api/review/${productId}/reviews?page=${page}&limit=${limit}`;

    if (rating) {
      url += `&rating=${rating}`;
    }

    console.log("Fetching product reviews:", url);
    const response = await api.get(url);
    console.log("Product reviews response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    throw error;
  }
};

const reviewsService = {
  getOrdersToReview,
  submitReview,
  getProductReviews,
};

export default reviewsService;
