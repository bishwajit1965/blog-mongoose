import axios from "axios";

const baseURL = "http://localhost:5000/api/super-admin"; // Change if your API URL is different
const superAdminApi = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${baseURL}/login`, {
        email,
        password,
      });
      return response.data.token;
    } catch (error) {
      console.error("Login failed", error);
    }
  },

  verifyToken: async (token) => {
    try {
      const response = await axios.get(`${baseURL}/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Token verification failed", error);
    }
  },
};

export default superAdminApi;
