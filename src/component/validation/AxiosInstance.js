import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:6700', 
   baseURL:'https://emp3-3e2i.onrender.com'
});
// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    // Add the access token to the request headers
    const accessToken = JSON.parse(localStorage.getItem('token'));
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Add response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle token expiration and refresh
    if (error.response && error.response.status === 401) {
        console.log("this block is running refresh=tkien insssss")
      const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:6700/user/refresh-token', {
            refreshToken: refreshToken,
          });

          // Update the access token in local storage
          localStorage.setItem('token', JSON.stringify(response.data.token));

          // Retry the original request with the new access token
          const originalRequest = error.config;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Handle refresh token error
          return Promise.reject(refreshError);
        }
      }
    }

    // Handle other response errors
    return Promise.reject(error);
  }
);

export default instance;
