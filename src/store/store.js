import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    loader: loaderSlice.reducer
  },
});

export default store;
