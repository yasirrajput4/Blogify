import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

/**
 * Redux store.
 * Currently holds only the auth slice. Additional slices (e.g. posts)
 * can be added under the `reducer` key as the app grows.
 */
const store = configureStore({
  reducer: {
    auth: authSlice,
    // posts: postsSlice,  ← add future slices here
  },
});

export default store;
