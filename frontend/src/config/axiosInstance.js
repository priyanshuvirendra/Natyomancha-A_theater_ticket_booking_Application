// axiosInstance.js
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/slices/userSlice.js";

const APIURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: `${APIURL}`,
});

// add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// handle token expiry or errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    //const { dispatch } = useUser();
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      localStorage.removeItem("user");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
