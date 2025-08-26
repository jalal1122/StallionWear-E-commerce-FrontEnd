import axios from "axios";

const localLink = "http://localhost:5000";

const productionLink = "https://stallionwearbackend.vercel.app/";

// Create axios instance
const instance = axios.create({
  baseURL: productionLink || localLink, // Adjust to match your backend port
  withCredentials: true,
});

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const response = await instance.post("/refresh-token", {});
    const { user } = response.data.data;

    // Update localStorage with new user data including new access token
    localStorage.setItem("user", JSON.stringify(user));

    return user.accessToken;
  } catch (error) {
    // If refresh fails, clear user data and redirect to login
    localStorage.removeItem("user");

    // Clear cookies
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login page
    window.location.href = "/login";

    return null;
  }
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

// Response interceptor to handle 401 errors and refresh token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
