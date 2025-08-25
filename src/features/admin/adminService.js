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

const getAllProducts = async (filter) => {
  const previousPage =
    parseInt(JSON.parse(localStorage.getItem("adminCurrentPage"))) || 1;

  // if next page button is pressed, increment the current page
  if (filter && filter.nextPage) {
    localStorage.setItem("adminCurrentPage", JSON.stringify(previousPage + 1));
  }

  // if previous page button is pressed, decrement the current page
  if (filter && filter.previousPage) {
    localStorage.setItem("adminCurrentPage", JSON.stringify(previousPage - 1));
  }

  // get the current page from localStorage
  const currentPage =
    parseInt(JSON.parse(localStorage.getItem("adminCurrentPage"))) || 1;

  // Build query parameters for filters
  let queryParams = `page=${currentPage}&sortOrder=${filter?.sortBy || "desc"}`;

  if (filter?.category) queryParams += `&category=${filter.category}`;
  if (filter?.brand) queryParams += `&brand=${filter.brand}`;
  if (filter?.minPrice) queryParams += `&minPrice=${filter.minPrice}`;
  if (filter?.maxPrice) queryParams += `&maxPrice=${filter.maxPrice}`;

  // fetch all products from the API with optional filter
  const response = await axios.get(
    `${product_api_url}?${queryParams}`,
    {},
    {
      Headers: {},
    }
  );

  // If the response is successful, store the data in localStorage
  if (response.status === 200) {
    localStorage.setItem("adminProducts", JSON.stringify(response.data));
    localStorage.setItem(
      "adminTotalPages",
      JSON.stringify(response.data.data.totalPages)
    );
    localStorage.setItem(
      "adminCurrentPage",
      JSON.stringify(response.data.data.currentPage)
    );
  }

  // Return the products data
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
