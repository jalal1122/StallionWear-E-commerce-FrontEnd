import axios from "axios";

// Set up default configuration for axios
axios.defaults.baseURL = "http://localhost:5000"; // Adjust to match your backend port
axios.defaults.withCredentials = true;

export default axios;