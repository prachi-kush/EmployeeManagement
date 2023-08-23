import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
// import axios from 'axios';
import axios from '../validations/AxiosInstance'


const PrivateComponent = () => {
  const auth = JSON.parse(localStorage.getItem('admin'));

  if (!auth) {
    return <Navigate to="/admin/login"/>;
  }

  const decoded = jwt_decode(auth.token);
  console.log('decoded: ', decoded);

  if (decoded.exp * 1000 <= Date.now()) {
  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post('/admin/refresh', { refreshToken });
      const newAccessToken = response.data.accessToken;
      auth.token = newAccessToken;
      localStorage.setItem('admin', JSON.stringify(auth));
    } catch (error) {
      console.error('Error refreshing access token:', error);
      localStorage.clear();
      window.location.reload('/admin/login')
      return <Navigate to="/admin/login" />;
    }
  };
  refreshAccessToken(auth.refreshToken)
  }

  return <Outlet />;
};

export default PrivateComponent;


