// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null; // Clear any previous login errors
    },
    setError: (state, action) => {
      state.user = null; // Clear the user data on login failure
      state.error = action.payload;
    },
    clearAuthData: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { setUser, setError, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
