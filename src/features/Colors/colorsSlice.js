import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    mode: "light",
    colors: {
      textColor1: "#000",
      textColor2: "#858585",
      bgColor1: "#FFF",
      bgColor2: "#F0F0F0",
    },
  },
  reducers: {
    GetMode: (state, action) => {
      state.mode = action.payload;
      if (action.payload === "dark") {
        state.colors.textColor1 = "#FFFFFF";
        state.colors.textColor2 = "#858585";
        state.colors.bgColor1 = "#000";
        state.colors.bgColor2 = "#F0F0F0";
      } else {
        state.colors.textColor1 = "#000";
        state.colors.textColor2 = "#858585";
        state.colors.bgColor1 = "#FFFFFF";
        state.colors.bgColor2 = "#F0F0F0";
      }
    },
  },
});

export const { GetMode } =
  colorSlice.actions;

export default colorSlice.reducer;
