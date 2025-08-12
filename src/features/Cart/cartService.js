import axios from "../../utils/axios.js";

const API_URL = "/api/cart";

const cartService = {
  addToCart: async ( productId, size, color) => {
    try {
      const response = await axios.post(`${API_URL}/add`, {
        productId,
        size,
        color,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  removeFromCart: async ( productId, size, color) => {
    try {
      const response = await axios.delete(`${API_URL}/remove`, {
         data:{
           productId,
          size,
          color,
         }
      });
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

  decrementCartItems: async ( productId, size, color) => {
    try {
      const response = await axios.patch(`${API_URL}/decrement`, {
         
          productId,
          size,
          color
         
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  incrementCartItems: async ( productId, size, color) => {
    console.log(productId, size, color)
    try {
      const response = await axios.patch(`${API_URL}/increment`, {
       
        productId,
        size,
        color
       
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};



export default cartService;
