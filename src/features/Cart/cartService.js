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
  removeFromCart: async () => {
    try {
      const response = await axios.delete(`${API_URL}/remove`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getCartItems: async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  clearCart: async () => {
    try {
      const response = await axios.delete(`${API_URL}/clear`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  decrementCartItems: async () => {
    try {
      const response = await axios.delete(`${API_URL}/decrement`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  incrementCartItems: async () => {
    try {
      const response = await axios.post(`${API_URL}/increment`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};



export default cartService;
