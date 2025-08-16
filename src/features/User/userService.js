import axios from "../../utils/axios.js";

// Base URL for the user API (already included in API instance)
const USER_ENDPOINT = "api/user";

// function to send the registration request to backend
const registerUser = async (userData) => {
  // Prepare form data for file upload
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("profilePicture", userData.profilePicture);

  // Send POST request to register user
  const response = await axios.post(`${USER_ENDPOINT}/register`, formData, {
    headers: {},
  });

  // return the response data
  return response.data;
};

// function to send the login request to backend
const loginUser = async (userData) => {
  // Send POST request to login user
  const response = await axios.post(`${USER_ENDPOINT}/login`, userData, {
    headers: {},
  });


  // if the response contains user data, store it in localStorage
  if (response.data && response.data.success && response.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }

  // return the response data
  return response.data;
};

// function to send the logout request to backend
export const logoutUser = async () => {
  // Send POST request to logout user (no body needed, auth from headers)
  const response = await axios.post(`${USER_ENDPOINT}/logout`);

  // remove the user from the local storage
  localStorage.removeItem("user");

  // remove the accessToken and refreshToken from the cookies
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // return the response data
  return response.data;
};

export const userService = {
  registerUser,
  loginUser,
  logoutUser,
};
