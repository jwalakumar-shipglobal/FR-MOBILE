import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const Base_URL = process.env.EXPO_PUBLIC_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: Base_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const attactToken = async (config: InternalAxiosRequestConfig) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(attactToken);

const handleError = async (error: any) => {
  const status = error.response?.status;
  if (status === 401) {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      await SecureStore.deleteItemAsync("token");
      router.replace("/login");
    }
  }

  return Promise.reject(error);
};

api.interceptors.response.use((res) => res, handleError);

export default api;
