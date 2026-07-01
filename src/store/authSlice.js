import { createSlice } from "@reduxjs/toolkit";

/**
 * authSlice
 * Manages global authentication state.
 * - status: boolean — whether a user session is active
 * - userData: object | null — the Appwrite user object from account.get()
 *
 * No logic changes. The TODO comment about adding a posts slice is
 * left as-is since that's a future concern, not a bug.
 */
const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
