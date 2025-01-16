import { useEffect, useReducer, useState } from "react";

import AdminAuthContext from "../adminAuthContext/AdminAuthContext";
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
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  const loginAdmin = async (credentials) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}/admin/login`,
        credentials,
        { withCredentials: true } // Ensures cookies are sent/received
      );

      const { user } = response.data;

      // Store user data in context
      dispatch({ type: "LOGIN_SUCCESS", payload: user });

      return user; // Return user object instead of token
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${baseUrl}/admin/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        // Call the backend to verify the token and fetch user data
        const response = await axios.get(`${baseUrl}/admin/me`, {
          withCredentials: true, // Ensures HTTP-only cookies are sent with the request
        });

        // Update state with the authenticated user's data
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      } catch (error) {
        console.error("Error verifying token:", error);
        // Reset state if token verification fails
        dispatch({ type: "LOGOUT" });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [baseUrl]);

  const adminAuthInfo = {
    loading,
    ...state,
    isAuthenticated: state.isAuthenticated,
    adminData: state.adminData,
    loginAdmin,
    logoutAdmin,
  };

  return (
    <AdminAuthContext.Provider value={adminAuthInfo}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
