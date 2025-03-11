// import axios from "axios";
// import { notifyError } from "../adminComponent/adminToastNotification/AdminToastNotification";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
//   withCredentials: true, // Ensure cookies are sent with requests
//   timeout: 10000, // ⏳ Set a timeout of 10 seconds
// });

// // Request interceptor to dynamically set Content-Type
// api.interceptors.request.use(
//   (config) => {
//     if (!config.headers["Content-Type"]) {
//       if (config.data instanceof FormData) {
//         delete config.headers["Content-Type"]; // Let the browser set it automatically
//       } else {
//         config.headers["Content-Type"] = "application/json";
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error) // Handle request errors
// );

// // Response interceptor for centralized error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { response } = error;

//     if (response) {
//       const { status, data } = response;

//       if (status === 401) {
//         notifyError("Session expired. Please log in again.");
//         window.location.href = "/login"; // Redirect user to login
//       } else {
//         notifyError(data?.message || "An error occurred. Please try again.");
//       }
//     } else {
//       notifyError("Network error. Please check your connection.");
//     }

//     console.error("API error:", response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";
import { notifyError } from "../adminComponent/adminToastNotification/AdminToastNotification";

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
    if (error.response && error.response.data.message) {
      notifyError(error.response.data.message);
    } else {
      notifyError("An error occurred. Please try again later.");
    }
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error); // Optionally rethrow for caller to handle
  }
);

export default api;
