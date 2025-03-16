import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true, // Ensures cookies (httpOnly) are sent with requests
});

// Request Interceptor (Optional: Add any default request modifications)
api.interceptors.request.use(
  (config) => {
    // Additional request modifications if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the response status is 401 (Unauthorized), try refreshing the token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        await axios.post(
          `${
            import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
          }/admin/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Retry the original request after a successful token refresh
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed. Logging out user...");
        // Redirect user to login page
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
//   withCredentials: true, // Ensures cookies (httpOnly) are sent
//   timeout: 10000, // 10 seconds timeout
// });

// let isRefreshing = false;
// let refreshSubscribers = [];

// const subscribeTokenRefresh = (callback) => {
//   refreshSubscribers.push(callback);
// };

// const onRefreshed = (token) => {
//   refreshSubscribers.forEach((callback) => callback(token));
//   refreshSubscribers = [];
// };

// api.interceptors.response.use(
//   (response) => response, // Pass through successful responses
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error is 401 (Unauthorized) and it's NOT a refresh request itself
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       if (!isRefreshing) {
//         isRefreshing = true;

//         try {
//           const response = await axios.post(
//             `${
//               import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
//             }/admin/refresh-token`,
//             {},
//             { withCredentials: true }
//           );

//           isRefreshing = false;
//           onRefreshed(response.data.accessToken);
//         } catch (refreshError) {
//           isRefreshing = false;
//           return Promise.reject(refreshError);
//         }
//       }

//       return new Promise((resolve) => {
//         subscribeTokenRefresh((token) => {
//           originalRequest.headers["Authorization"] = `Bearer ${token}`;
//           resolve(api(originalRequest)); // Retry the failed request
//         });
//       });
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// import axios from "axios";
// import { notifyError } from "../adminComponent/adminToastNotification/AdminToastNotification";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
//   withCredentials: true, // Ensures cookies (httpOnly) are sent with requests
//   timeout: 10000,
// });

// let isRefreshing = false;
// let failedRequestsQueue = [];

// // Response Interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If unauthorized (401) and not already retried
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // Check if the refresh token is available in cookies
//       const cookies = document.cookie
//         .split(";")
//         .find((cookie) => cookie.trim().startsWith("refreshToken="));

//       if (!cookies) {
//         console.log("❌ No refresh token found, user likely logged out");
//         // No refresh token available, so we stop the retry and show error
//         notifyError("Session expired. Please log in again.");
//         window.location.href = "/admin/login"; // Redirect to login
//         return Promise.reject(error);
//       }

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedRequestsQueue.push({ resolve, reject });
//         })
//           .then(() => api(originalRequest))
//           .catch((err) => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         // Refresh token request (cookie-based)
//         await axios.post(
//           `${
//             import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
//           }/admin/refresh-token`,
//           {},
//           { withCredentials: true }
//         );

//         // Retry failed requests
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

//         // Redirect to login page
//         window.location.href = "/admin/login";

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
