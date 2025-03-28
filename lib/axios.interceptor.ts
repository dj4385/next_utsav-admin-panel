import axios from "axios";

const api = axios.create({
  baseURL: "https://utsav.nsightech.com/v1/api", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - Add Authorization Header
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // Get token from storage (if available)
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Response Interceptor - Handle Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
