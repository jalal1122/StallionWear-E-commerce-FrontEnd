import axios from "axios";

const Api_URL = "api/user";

const options = {
  headers: {
    Credentials: true,
  },
};

const registerUser = async (userData) => {
  // Prepare form data for file upload
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("profilePicture", userData.profilePicture);

  const response = await axios.post(`${Api_URL}/register`, formData, options);
  return response.data;
};


const loginUser = async (userData) => {
  const response = await axios.post(`${Api_URL}/login`, userData, options);
  return response.data;
};

export const userService = {
  registerUser,
  loginUser,
};
