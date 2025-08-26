// Test API connection
import axios from "../utils/axios.js";

export const testApiConnection = async () => {
  try {
    console.log("Testing API connection to:", axios.defaults.baseURL);

    // Test basic health endpoint
    const healthResponse = await axios.get("/health");
    console.log("Health check successful:", healthResponse.data);

    // Test API endpoint
    const apiResponse = await axios.get("/api/product");
    console.log("API endpoint test successful:", apiResponse.status);

    return { success: true, message: "API connection working" };
  } catch (error) {
    console.error("API connection failed:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      baseURL: axios.defaults.baseURL,
    });

    return {
      success: false,
      error: error.message,
      details: error.response?.data,
    };
  }
};

// Export for easy testing in console
window.testApiConnection = testApiConnection;
