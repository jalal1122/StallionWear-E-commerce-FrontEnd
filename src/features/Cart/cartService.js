import axios from "../../utils/axios.js";

const API_URL = "/api/cart";

const cartService = {
  addToCart: async (productId, size, color,price) => {
    const response = await axios.post(`${API_URL}/add`, {
      productId,
      size,
      color,
      price
    });
    return response.data;
  },
  removeFromCart: async (productId, size, color) => {
    const response = await axios.patch(`${API_URL}/remove`, {
      productId,
      size,
      color,
    });
    return response.data;
  },
  getCartItems: async () => {
    const response = await axios.get(`${API_URL}`);
    console.log(response.data);
    return response.data;
  },

  clearCart: async () => {
    const response = await axios.delete(`${API_URL}/clear`);
    return response.data;
  },

  decrementCartItems: async (productId, size, color) => {
    const response = await axios.patch(`${API_URL}/decrement`, {
      productId,
      size,
      color,
    });
    return response.data;
  },

  incrementCartItems: async (productId, size, color) => {
    console.log(productId, size, color);
    const response = await axios.patch(`${API_URL}/increment`, {
      productId,
      size,
      color,
    });
    return response.data;
  },
};

export default cartService;
