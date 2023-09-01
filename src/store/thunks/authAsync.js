// authAsync.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../validations/AxiosInstance';

export const loginAsync = createAsyncThunk('auth/login', async (data) => {
  try {
    console.log('data: ', data);
    const response = await axios.post('/admin/login', data);
    console.log('response: ', response.data);
  
    console.log('working==================>>>', response.data);
    alert("alert ",response.data)
if(response.message!=='Admin login successful') {
      console.log('response.data.error: ', response.data.error);
      throw new Error(response.data.error);
  }
    localStorage.setItem('admin', JSON.stringify(response.data));
    localStorage.setItem('token', JSON.stringify(response.data.token));
    localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'An error occurred';
    throw new Error(errorMessage);
  }
});
