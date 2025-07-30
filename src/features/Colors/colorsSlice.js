import { createSlice } from "@reduxjs/toolkit";

const mode = localStorage.getItem("mode") || "light";

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    mode: mode,
    colors: {
      primaryText: "#000",
      secondaryText: "#858585",
      primaryBg: "#FFF",
      secondaryBg: "#F0F0F0",
    },
  },
  reducers: {
    GetMode: (state, action) => {
      state.mode = action.payload;
      if (action.payload === "dark") {
        state.colors.primaryText = "#fff";
        state.colors.primaryBg = "#000";
      } else {
        state.colors.primaryText = "#000";
        state.colors.primaryBg = "#fff";
      }
    },
  },
});

export const { GetMode } = colorSlice.actions;

export default colorSlice.reducer;
