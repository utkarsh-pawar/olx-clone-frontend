import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
    // userData: {},
  },
  reducers: {
    startLoading(state, action) {
      state.isLoading = true;
    },
    stopLoading(state, action) {
      state.isLoading = false;
    },
  },
});

export const loaderActions = loaderSlice.actions;

export default loaderSlice;
