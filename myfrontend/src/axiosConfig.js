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

const axiosConfig = axios.create({
  baseURL: "http://0.0.0.0:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  /* withCredentials: true, */
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      /* config.headers.Cookie = `token=${accessToken}`; */
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
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://0.0.0.0:8000/api/token/refresh/",
            { refresh: refreshToken },
          );
          const newAccessToken = response.data.access;
          Cookies.set("token", newAccessToken, {
            expires: 1, // expira em 1 dia
            path: '/',
            secure: true,
            sameSite: 'strict',
          });
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          // Handle token refresh failure
          Cookies.remove("token");
          Cookies.remove("refreshToken");
          window.location.href = "/"; // Redirect to login on failure
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosConfig;