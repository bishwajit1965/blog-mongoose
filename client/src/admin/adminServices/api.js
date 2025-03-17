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
