// src/helperApiService/firebaseApiService.js
import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true,
});

// Optional: attach token automatically if currentUser exists
api.interceptors.request.use(
  async (config) => {
    if (!config.headers["Content-Type"]) {
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      } else {
        config.headers["Content-Type"] = "application/json";
      }
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
      console.log("ATTACHED TOKEN:", config.headers.Authorization);
    } else {
      console.log("No user, no token attached");
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
