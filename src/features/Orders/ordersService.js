import axios from "../../utils/axios.js";

const api_Url = "api/order";

const getUserOrders = async (currentPage = 1, orderStatus = "") => {
  let url = `${api_Url}/my-orders?page=${currentPage}`;

  if (orderStatus && orderStatus.trim() !== "") {
    url += `&status=${orderStatus}`;
  }

  const response = await axios.get(url);
  return response.data;
};

const getOrderbyId = async (orderId) => {
  const response = await axios.get(`${api_Url}/${orderId}`);
  return response.data;
};

const cancelOrder = async (orderId) => {
  const response = await axios.patch(`${api_Url}/${orderId}/cancel`);
  return response.data;
};

export const ordersService = {
  getUserOrders,
  getOrderbyId,
  cancelOrder,
};
