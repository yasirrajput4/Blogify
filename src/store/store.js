import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    // posts: postsSlice,  ← add future slices here
  },
});

export default store;
