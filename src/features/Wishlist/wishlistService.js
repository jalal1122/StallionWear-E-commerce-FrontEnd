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
    { itemId },{
      productId,
      size,
      color,
    },
    {
      headers: {
      },
    }
    
  );
  return response.data;
};

// Fixed: Correct DELETE request syntax
const removeFromWishlist = async (itemId, token) => {
  const response = await axios.delete(
    `${API_URL}/${itemId}`, {
      productId,
      size,
      color,
    },
    {
      headers: {},
    }
   
  );
  return response.data;
};

// clear the user's wishlist
const clearWishlist = async () => {
  const response = await axios.delete(API_URL, {
    headers: {},
  });
  return response.data;
};

const moveToCart = async (productId, size, color) => {
  const response = await axios.post(
    "/api/cart",
    { productId, size, color },
    {
      headers: {},
    }
  );
  return response.data;
};

const wishlistService = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart,
  clearWishlist,
};

export default wishlistService;
