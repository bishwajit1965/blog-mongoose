import axios from "axios";

const api = axios.create({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
});

// Add a request interceptor to set Content-type dynamically
api.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-type"]) {
      //Set Content-type to JSON if not already specified
      if (config.data instanceof FormData) {
        delete config.headers["Content-type"];
      } else {
        config.headers["Content-type"] = "application/json";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
