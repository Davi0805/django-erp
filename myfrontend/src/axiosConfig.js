/* import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://0.0.0.0:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://0.0.0.0:8000/api/token/refresh/",
            { refresh: refreshToken },
          );
          const newAccessToken = response.data.access;
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          // Handle token refresh failure
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/"; // Redirect to login on failure
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosConfig;
 */

import axios from "axios";
import Cookies from 'js-cookie';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};



const axiosConfig = axios.create({
  baseURL: "http://127.0.0.1:8080/api/",
  headers: {
    "Content-Type": "application/json",
  }
});

axiosConfig.interceptors.request.use(
  (config) => {
    /* Cookies.set('token', "Opa"); */
    const accessToken = Cookies.get('token');
    console.log("AXIOS: ", accessToken)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosConfig.defaults.withCredentials = true;

/* axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refresh');
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            { refresh: refreshToken },
          );
          const newAccessToken = response.data.access;
          Cookies.set('token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          // Handle token refresh failure
          Cookies.remove('token');
          Cookies.remove('token');
        }
      }
    }
    return Promise.reject(error);
  },
); */

export default axiosConfig;
