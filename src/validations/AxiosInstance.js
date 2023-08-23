import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:6700', // Your API base URL
  baseURL:'https://emp3-3e2i.onrender.com'

});

instance.interceptors.request.use(
  (config) => {
    // Add the access token to the request headers
    const accessToken = JSON.parse(localStorage.getItem('token'));
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers['RefreshToken'] = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle token expiration and refresh
    if (error.response && error.response.status === 401) {
      const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:6700/admin/refresh', {
            refreshToken: refreshToken,
          });

          localStorage.setItem('token', JSON.stringify(response.data.token));
          localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken)); // Update the refresh token

          // Retry the original request with the new access token
          const originalRequest = error.config;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
          return axios(originalRequest);
        } catch (refreshError) {
        localStorage.clear();
        window.location.reload('/admin/login')
          // localStorage.removeItem('token');
          // localStorage.removeItem('refreshToken'); // Remove expired refresh token
          return Promise.reject(refreshError);
        }
      } else {
        localStorage.clear();
        window.location.reload('/admin/login')
      }
    }

    return Promise.reject(error);
  }
);


export default instance;
