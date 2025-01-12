import axios, { AxiosError, CreateAxiosDefaults } from "axios";
import config from "./config";
import cookie from "./cookie";

const axiosDefaults: CreateAxiosDefaults = {
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const apiWithoutInterceptors = axios.create(axiosDefaults);
export const apiWithoutCredentials = axios.create({
  ...axiosDefaults,
  withCredentials: false,
});

const api = axios.create(axiosDefaults);

api.interceptors.response.use(
  (response) => {
    const { accessToken, ...rest } = response.data;

    if (accessToken) {
      cookie.accessToken.set(accessToken);
    }

    return rest;
  },
  (error: AxiosError) => {
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
