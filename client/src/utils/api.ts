import axios from "axios";
import config from "./config";
import cookie from "./cookie";

const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    const { accessToken, ...rest } = response.data;

    if (accessToken) {
      cookie.accessToken.set(accessToken);
    }

    return rest;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const accessToken = cookie.accessToken.get();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${cookie.accessToken.get()}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
