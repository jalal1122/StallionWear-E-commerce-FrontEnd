import axios from "axios";

const localLink = "http://localhost:5000";
const productionLink =
  import.meta.env.VITE_API_URL || "https://stallionwearbackend.vercel.app";

// Determine base URL based on environment
const baseURL =
  import.meta.env.VITE_NODE_ENV === "production" ? productionLink : localLink;

// Create axios instance
const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 30000, // 30 second timeout
});

// Function to handle logout when token expires
const handleTokenExpiration = () => {
  // Clear user data from localStorage
  localStorage.removeItem("user");

  // Clear cookies
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirect to login page
  window.location.href = "/login";
};

// Request interceptor to add access token
instance.interceptors.request.use(
  (config) => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      if (user && user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("user");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors (token expired)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If token expired (401), logout the user directly
    if (error.response && error.response.status === 401) {
      // Prevent multiple redirects by checking if we're not already on login page
      if (!window.location.pathname.includes("/login")) {
        handleTokenExpiration();
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
