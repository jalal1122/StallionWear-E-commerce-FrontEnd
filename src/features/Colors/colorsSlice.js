import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    mode: "light", // Default mode, will be updated by component
    colors: {
      primaryText: "#000",
      secondaryText: "#858585",
      primaryBg: "#fff",
      secondaryBg: "#f0f0f0",
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
