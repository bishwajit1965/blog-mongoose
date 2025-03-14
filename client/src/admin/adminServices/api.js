import axios from "axios";
import { notifyError } from "../adminComponent/adminToastNotification/AdminToastNotification";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true, // Ensures cookies (httpOnly) are sent with requests
  timeout: 10000,
});

let isRefreshing = false;
let failedRequestsQueue = [];

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized (401) and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // Refresh token request (cookie-based)
        await axios.post(
          `${
            import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
          }/admin/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Retry failed requests
        failedRequestsQueue.forEach((req) => req.resolve());
        failedRequestsQueue = [];
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token expired. Logging out...");

        // Reject all queued requests
        failedRequestsQueue.forEach((req) => req.reject(refreshError));
        failedRequestsQueue = [];
        isRefreshing = false;

        // Notify user
        notifyError("Session expired. Please log in again.");

        // Redirect to login page
        window.location.href = "/admin/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// import axios from "axios";
// import { notifyError } from "../adminComponent/adminToastNotification/AdminToastNotification";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
//   withCredentials: true, // Ensure cookies (httpOnly) are sent with requests
//   timeout: 10000,
// });

// let isRefreshing = false;
// let failedRequestsQueue = [];

// // Response Interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If the request is unauthorized (401) and not already retried
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedRequestsQueue.push({ resolve, reject });
//         })
//           .then(() => api(originalRequest))
//           .catch((err) => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         // Attempt to refresh the token
//         await axios.post(
//           `${
//             import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
//           }/admin/refresh-token`,
//           {},
//           { withCredentials: true }
//         );

//         // Retry all failed requests
//         failedRequestsQueue.forEach((req) => req.resolve());
//         failedRequestsQueue = [];
//         isRefreshing = false;

//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("❌ Refresh token expired. Logging out...");

//         // Reject all queued requests
//         failedRequestsQueue.forEach((req) => req.reject(refreshError));
//         failedRequestsQueue = [];
//         isRefreshing = false;

//         // Notify user
//         notifyError("Session expired. Please log in again.");

//         // Clear authentication state
//         localStorage.removeItem("authToken"); // Remove stored token
//         sessionStorage.removeItem("authToken"); // Remove from session if used

//         // Optional: Dispatch logout if using React Context or Redux
//         // dispatch({ type: "LOGOUT" });

//         // Redirect to login page
//         window.location.href = "/admin/login";

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// import axios from "axios";
// import { notifyError } from "../adminComponent/adminToastNotification/AdminToastNotification";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
//   withCredentials: true, // Ensure cookies are sent
//   timeout: 10000,
// });

// let isRefreshing = false;
// let failedRequestsQueue = [];

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedRequestsQueue.push({ resolve, reject });
//         })
//           .then(() => api(originalRequest))
//           .catch((err) => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         await axios.post(
//           `${
//             import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
//           }/admin/refresh-token`,
//           {},
//           { withCredentials: true }
//         );

//         failedRequestsQueue.forEach((req) => req.resolve());
//         failedRequestsQueue = [];
//         isRefreshing = false;

//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("❌ Refresh token expired. Logging out...");
//         failedRequestsQueue.forEach((req) => req.reject(refreshError));
//         failedRequestsQueue = [];
//         isRefreshing = false;

//         notifyError("Session expired. Please log in again.");
//         window.location.href = "/admin/login"; // Redirect to login
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// import axios from "axios";
// import { notifyError } from "../adminComponent/adminToastNotification/AdminToastNotification";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
//   withCredentials: true, // Automatically send cookies with requests
//   timeout: 10000, // ⏳ Set a timeout of 10 seconds
// });

// // Request Interceptor: Set content type dynamically
// api.interceptors.request.use(
//   (config) => {
//     if (!config.headers["Content-Type"]) {
//       if (config.data instanceof FormData) {
//         delete config.headers["Content-Type"]; // Let the browser set it
//       } else {
//         config.headers["Content-Type"] = "application/json";
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Flag to prevent multiple refresh calls
// let isRefreshing = false;
// let failedRequestsQueue = [];

// // Response Interceptor: Handles token expiration
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const { response } = error;

//     if (response) {
//       const { status, data } = response;

//       if (status === 401 && !originalRequest._retry) {
//         if (isRefreshing) {
//           return new Promise((resolve, reject) => {
//             failedRequestsQueue.push({ resolve, reject });
//           })
//             .then(() => api(originalRequest))
//             .catch((err) => Promise.reject(err));
//         }

//         originalRequest._retry = true;
//         isRefreshing = true;

//         try {
//           // Send a request to refresh the token
//           await axios.post(
//             `${
//               import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
//             }/admin/refresh-token`,
//             {},
//             { withCredentials: true }
//           );

//           // Retry all stored requests
//           failedRequestsQueue.forEach((req) => req.resolve());
//           failedRequestsQueue = [];
//           isRefreshing = false;

//           return api(originalRequest); // Retry original request
//         } catch (refreshError) {
//           console.error("❌ Refresh token failed. Logging out...");
//           failedRequestsQueue.forEach((req) => req.reject(refreshError));
//           failedRequestsQueue = [];
//           isRefreshing = false;

//           notifyError("Session expired. Please log in again.");
//           window.location.href = "/admin/login"; // Redirect to login
//         }
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

// import axios from "axios";
// import { notifyError } from "../adminComponent/adminToastNotification/AdminToastNotification";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
//   withCredentials: true, // Ensure cookies are sent with requests
//   timeout: 10000, // ⏳ Set a timeout of 10 seconds
// });

// // Request Interceptor: Automatically set content type
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
//   (error) => Promise.reject(error)
// );

// // Flag to prevent infinite refresh loops
// let isRefreshing = false;
// let failedRequestsQueue = [];

// // Response Interceptor: Handles token expiration
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const { response } = error;

//     if (response) {
//       const { status, data } = response;

//       if (status === 401 && !originalRequest._retry) {
//         if (isRefreshing) {
//           // Store the failed request and retry it once refresh is done
//           return new Promise((resolve, reject) => {
//             failedRequestsQueue.push({ resolve, reject });
//           })
//             .then((token) => {
//               originalRequest.headers["Authorization"] = `Bearer ${token}`;
//               return api(originalRequest);
//             })
//             .catch((err) => Promise.reject(err));
//         }

//         originalRequest._retry = true;
//         isRefreshing = true;

//         try {
//           const refreshResponse = await axios.post(
//             `${
//               import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
//             }/admin/refresh-token`,
//             {},
//             { withCredentials: true }
//           );

//           if (refreshResponse.status === 200) {
//             const newAccessToken = refreshResponse.data.accessToken;

//             // Retry failed requests with the new token
//             failedRequestsQueue.forEach((req) => req.resolve(newAccessToken));
//             failedRequestsQueue = [];

//             isRefreshing = false;

//             // Retry the original request with new token
//             originalRequest.headers[
//               "Authorization"
//             ] = `Bearer ${newAccessToken}`;
//             return api(originalRequest);
//           }
//         } catch (refreshError) {
//           console.error("❌ Refresh token failed. Logging out...");
//           failedRequestsQueue.forEach((req) => req.reject(refreshError));
//           failedRequestsQueue = [];
//           isRefreshing = false;

//           notifyError("Session expired. Please log in again.");
//           window.location.href = "/login"; // Redirect user to login
//         }
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

// import axios from "axios";
// import { notifyError } from "../adminComponent/adminToastNotification/AdminToastNotification";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
//   withCredentials: true, // Ensure cookies are sent with requests
// });

// // Request interceptor to dynamically set Content-Type
// api.interceptors.request.use(
//   (config) => {
//     if (!config.headers["Content-Type"]) {
//       // Adjust Content-Type based on data type
//       if (config.data instanceof FormData) {
//         delete config.headers["Content-Type"];
//       } else {
//         config.headers["Content-Type"] = "application/json";
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error); // Handle request errors
//   }
// );

// // Response interceptor for centralized error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.data.message) {
//       notifyError(error.response.data.message);
//     } else {
//       notifyError("An error occurred. Please try again later.");
//     }
//     console.error("API error:", error.response?.data || error.message);
//     return Promise.reject(error); // Optionally rethrow for caller to handle
//   }
// );

// export default api;
