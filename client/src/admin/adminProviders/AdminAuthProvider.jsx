import { useCallback, useEffect, useReducer, useState } from "react";

import AdminAuthContext from "../adminContexts/AdminAuthContext";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  adminData: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        adminData: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        adminData: null,
      };

    default:
      return state;
  }
};

const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  const loginAdmin = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${baseURL}/admin/login`, credentials, {
        withCredentials: true,
      });
      const { user } = response.data;
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = async () => {
    try {
      setLoading(true);
      setError(null);
      await axios.post(
        `${baseURL}/admin/logout`,
        {},
        { withCredentials: true }
      );
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${baseURL}/admin/me`, {
        withCredentials: true,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error verifying token:", error);
      dispatch({ type: "LOGOUT" });
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  // Run once on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const adminAuthInfo = {
    loading,
    error,
    ...state,
    isAuthenticated: state.isAuthenticated,
    adminData: state.adminData,
    loginAdmin,
    logoutAdmin,
    checkAuth,
  };

  return (
    <AdminAuthContext.Provider value={adminAuthInfo}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
