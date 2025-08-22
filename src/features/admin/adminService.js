import axios from "../../utils/axios.js";

const api_url = "api/order";
const product_api_url = "api/product";

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
  return response;
};

const getAnalytics = async (period) => {
  const response = await axios.get(`${api_url}/admin/analytics`, {
    params: { period },
  });
  return response;
};

// Product Management Functions
const createProduct = async (productData) => {
  const response = await axios.post(`${product_api_url}/create`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const updateProduct = async ({ productId, productData }) => {
  const response = await axios.put(
    `${product_api_url}/update/${productId}`,
    productData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await axios.delete(`${product_api_url}/${productId}`);
  return response.data;
};

const getAllProducts = async (filters = {}) => {
  const response = await axios.get(`${product_api_url}`, {
    params: filters,
  });
  return response.data;
};

export const adminService = {
  updateOrderStatus,
  getAllOrders,
  getAnalytics,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
