import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true, // Ensure cookies are sent with requests
});

// Request interceptor to dynamically set Content-Type
api.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"]) {
      // Adjust Content-Type based on data type
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      } else {
        config.headers["Content-Type"] = "application/json";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Response interceptor for centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error); // Optionally rethrow for caller to handle
  }
);

export default api;
