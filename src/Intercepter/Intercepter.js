import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async config => {
  // Add your headers here
  const token = JSON.parse(localStorage.getItem('token'));
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));

  // Set the Authorization header with the access token
  config.headers['Authorization'] = `Bearer ${token}`;

  // Set the RefreshToken header with the refresh token
  config.headers['RefreshToken'] = refreshToken;

  try {
    // Check access token validity
    await axiosInstance.get('/verify-token', { headers: { Authorization: `Bearer ${token}` } });

    // Access token is valid, proceed with the request
    return config;
  } catch (error) {
    // Access token is invalid, try to refresh it
    try {
      const response = await axiosInstance.post('/refresh', null, { headers: { RefreshToken: refreshToken } });
      const newAccessToken = response.data.newAccessToken;
      
      // Update the access token in the local storage
      localStorage.setItem('token', JSON.stringify(newAccessToken));
      
      // Update the Authorization header with the new access token
      config.headers['Authorization'] = `Bearer ${newAccessToken}`;
      
      // Retry the original request with the new access token
      return config;
    } catch (refreshError) {
      // Refresh token is also invalid, handle the error as needed
      throw refreshError;
    }
  }
});

export default axiosInstance;
