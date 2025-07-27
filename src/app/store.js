import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "../features/Colors/colorsSlice";

export const store = configureStore({
  reducer: {
    colors: colorReducer,
  },
});
