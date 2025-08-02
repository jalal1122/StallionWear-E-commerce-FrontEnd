import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "../features/Colors/colorsSlice.js";
import userReducer from "../features/User/userSlice.js";
import productReducer from "../features/Products/productSlice.js";

export const store = configureStore({
  reducer: {
    colors: colorReducer,
    user: userReducer,
    products: productReducer,
  },
});
