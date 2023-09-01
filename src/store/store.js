
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/reducers/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  
  },
});

