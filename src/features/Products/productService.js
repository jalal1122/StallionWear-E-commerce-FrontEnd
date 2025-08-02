import axios from "../../utils/axios.js";

const Api_URL = "api/product";

// Function to get new arrivals products
const getNewArrivals = async () => {
  // Fetch new arrivals from the API
  const response = await axios.get(`${Api_URL}/newArrivals`);

  // If the response is successful, store the data in localStorage
  if (response.status === 200) {
    localStorage.setItem("newArrivals", JSON.stringify(response.data));
  }

  // Return the new arrivals data
  return response.data;
};

const productService = {
  getNewArrivals,
};

export default productService;
