import axios from "../../utils/axios.js";

const Api_URL = "/api/order";

const createOrder = async (orderData) => {
  const response = await axios.post(`${Api_URL}`, orderData);
  return response.data;
};

export const orderService = { createOrder };
