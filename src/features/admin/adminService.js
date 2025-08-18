import axios from "../../utils/axios.js";

const api_url = "api/order";

const updateOrderStatus = async (orderData) => {
  const response = await axios.patch(
    `${api_url}/${orderData.id}/status`,
    orderData
  );
  return response.data;
};

const getAllOrders = async (filter) => {
  const response = await axios.get(
    `${api_url}/admin/all`,
    filter ? { params: filter } : {}
  );
  return response.data;
};

export const adminService = {
  updateOrderStatus,
  getAllOrders,
};
