import axios from "axios";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});
console.log("API:", api);
// Add a request interceptor to set Content-Type and Authorization headers
api.interceptors.request.use(
  (config) => {
    // Set Content-Type dynamically based on data type
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] =
        config.data instanceof FormData ? undefined : "application/json";
    }

    // Get the token from localStorage (or other storage)
    const token = localStorage.getItem("jwt");
    if (token) {
      // Set Authorization header if the token exists
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error) // Handle request error
);

// Optionally, add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response, // Pass through successful responses

  async (error) => {
    // Check if error status is 401 (Unauthorized) to refresh token or redirect to login
    if (error.response?.status === 401) {
      // Optionally, attempt to refresh token here or redirect to login page
      console.warn("Unauthorized access - token might be expired or invalid.");
    }
    return Promise.reject(error);
  }
);

export default api;
