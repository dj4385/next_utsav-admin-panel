import axios from "axios";

import { store } from "@/lib/store";
import { useDispatch } from "react-redux";
import { setLoading } from "./features/LoadingSlice";

let requestCount = 0;

const startLoading = () => {
  requestCount++;
  store.dispatch(setLoading(true));
};

const stopLoading = () => {
  requestCount = Math.max(requestCount - 1, 0);
  if (requestCount === 0) {
    store.dispatch(setLoading(false));
  }
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - Add Authorization Header
api.interceptors.request.use((config) => {
  startLoading();
  const token = sessionStorage.getItem("token"); // Get token from storage (if available)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor - Handle Errors
api.interceptors.response.use(
  (response) => {
    stopLoading();
    return response;
  },
  (error) => {
    stopLoading();
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
