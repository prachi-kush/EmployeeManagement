
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
// import axios from 'axios';
import axios from '../validation/AxiosInstance'


const PrivateComponent = () => {
  const auth = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('token'))
  console.log('auth================================>: ', auth);

  if (!auth) {
    return <Navigate to="/"/>;
  }

  const decoded = jwt_decode(token);
  console.log('decoded: ', decoded);

  if (decoded.exp * 1000 <= Date.now()) {
  const refreshAccessToken = async (refreshToken) => {
    console.log('refreshToken: -------------------', refreshToken);
    try {
      const response = await axios.post('/user/refresh', { refreshToken });
      const newAccessToken = response.data.accessToken;
      auth.token = newAccessToken;
      localStorage.setItem('admin', JSON.stringify(auth));
    } catch (error) {
      console.error('Error refreshing access token:', error);
      localStorage.clear();
      window.location.reload('/')
      return <Navigate to="/" />;
    }
  };
  refreshAccessToken(auth.refreshToken)
  }

  return <Outlet />;
};

export default PrivateComponent;


