import { useEffect, useState } from "react";

import AdminAuthContext from "../adminProvider/AdminProvider";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";

const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Decode JWT token using jw-decode
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, [token]);

  const loginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("admin/auth/login", { email, password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token saved", token);
        return token;
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.", error);
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = () => {
    try {
      setLoading(true);
      localStorage.removeItem("token");
      setToken(null);
    } catch (error) {
      setError("Logout error", error);
    } finally {
      setLoading(false);
    }
  };

  const adminAuthInfo = {
    loading,
    token,
    user,
    loginAdmin,
    logoutAdmin,
    error,
  };

  return (
    <AdminAuthContext.Provider value={adminAuthInfo}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
