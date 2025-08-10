import axios from "../../utils/axios.js";

const API_URL = "/api/cart";

const cartService = {
  addToCart: async (item) => {
    try {
      const response = await axios.post(`${API_URL}/add`, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  removeFromCart: async (itemId) => {
    try {
      const response = await axios.delete(`${API_URL}/remove/${itemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getCartItems: async () => {
    try {
      const response = await axios.get(`${API_URL}/items`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default cartService;
