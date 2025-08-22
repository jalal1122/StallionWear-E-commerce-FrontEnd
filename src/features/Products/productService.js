import axios from "../../utils/axios.js";

const Api_URL = "api/product";

// Function to get all products with optional filtering
const getAllProducts = async (filter) => {
  const previousPage =
    parseInt(JSON.parse(localStorage.getItem("currentPage"))) || 1;

  // if next page button is pressed, increment the current page
  if (filter && filter.nextPage) {
    localStorage.setItem("currentPage", JSON.stringify(previousPage + 1));
  }

  // if previous page button is pressed, decrement the current page
  if (filter && filter.previousPage) {
    localStorage.setItem("currentPage", JSON.stringify(previousPage - 1));
  }

  // get the current page from localStorage
  const currentPage =
    parseInt(JSON.parse(localStorage.getItem("currentPage"))) || 1;

  // fetch all products from the API with optional filter
  const response = await axios.get(
    `${Api_URL}?page=${currentPage}&sortOrder=${filter?.sortBy || "desc"}${
      filter?.category ? "&category=" + filter.category : ""
    }${filter.brand ? "&brand=" + filter.brand : ""}${
      filter.minPrice ? "&minPrice=" + filter.minPrice : ""
    }${filter.maxPrice ? "&maxPrice=" + filter.maxPrice : ""}`,
    {},
    {
      Headers: {},
    }
  );

  // If the response is successful, store the data in localStorage
  if (response.status === 200) {
    localStorage.setItem("products", JSON.stringify(response.data));
    localStorage.setItem(
      "totalPages",
      JSON.stringify(response.data.data.totalPages)
    );
    localStorage.setItem(
      "currentPage",
      JSON.stringify(response.data.data.currentPage)
    );
  }

  // Return the products data
  return response.data;
};

// Function to get product details by ID
const getProductById = async (id) => {
  // Fetch product details from the API by ID
  const response = await axios.get(`${Api_URL}/${id}`);

  return response.data;
};

// Function to get products by category
const getRelevantProducts = async (category) => {
  // Fetch products by category from the API
  const response = await axios.get(
    `${Api_URL}${category ? `?category=${category}` : ""}`
  );

  return response.data;
};

// Function to get new arrivals products
const getNewArrivals = async () => {
  // Fetch new arrivals from the API
  const response = await axios.get(`${Api_URL}/newArrivals`);

  console.log("New Arrivals fetched successfully:", response.data);

  // Return the new arrivals data
  return response.data;
};

// Function to get top selling products
const getTopSelling = async () => {
  // Fetch top selling products from the API
  const response = await axios.get(`${Api_URL}/topSelling`);

  // Return the top selling products data
  return response.data;
};

const productService = {
  getNewArrivals,
  getTopSelling,
  getAllProducts,
  getProductById,
  getRelevantProducts,
};

export default productService;
