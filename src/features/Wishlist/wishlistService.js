import axios from "../../utils/axios.js";

const API_URL = "/api/wishlist";

// get the user's wishlist
const getWishlist = async () => {
  const response = await axios.get(API_URL, {
    headers: {},
  });
  return response.data;
};

// add an item to the user's wishlist
const addToWishlist = async (productId, size, color) => {
  const response = await axios.post(`${API_URL}/add`, {
    productId,
    size,
    color,
  });
  return response.data;
};

// Fixed: Correct DELETE request syntax
const removeFromWishlist = async (productId, size, color) => {
  const response = await axios.delete(`${API_URL}/remove`, {
    productId,
    size,
    color,
  });
  return response.data;
};

const moveToCart = async (productId, size, color) => {
  const response = await axios.post(`${API_URL}/moveToCart`, {
    productId,
    size,
    color,
  });
  return response.data;
};

const wishlistService = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart,
};

export default wishlistService;
