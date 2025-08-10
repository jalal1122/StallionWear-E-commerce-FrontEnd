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
const addToWishlist = async (itemId, token) => {
  const response = await axios.post(
    API_URL,
    { itemId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Fixed: Correct DELETE request syntax
const removeFromWishlist = async (itemId, token) => {
  const response = await axios.delete(`${API_URL}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// clear the user's wishlist
const clearWishlist = async (token) => {
  const response = await axios.delete(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const wishlistService = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
};

export default wishlistService;
