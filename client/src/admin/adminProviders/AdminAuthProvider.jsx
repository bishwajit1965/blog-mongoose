import { useCallback, useEffect, useReducer, useState } from "react";

import AdminAuthContext from "../adminContexts/AdminAuthContext";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  adminData: null,
  roles: [],
  permissions: [],
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        adminData: action.payload,
        roles: action.payload.roles || [],
        permissions: action.payload.permissions || [],
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        adminData: null,
        roles: [],
        permissions: [],
      };

    default:
      return state;
  }
};

const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionsMap, setPermissionsMap] = useState({});
  const [rolesMap, setRolesMap] = useState({});
  const baseURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  const fetchPermissionsAndRoles = useCallback(async () => {
    try {
      const [permissionsResponse, rolesResponse] = await Promise.all([
        axios.get(`${baseURL}/permissions`, {
          withCredentials: true,
        }),
        axios.get(`${baseURL}/roles`, {
          withCredentials: true,
        }),
      ]);

      const permissionsMap = {};
      permissionsResponse.data.forEach(
        (perm) => (permissionsMap[perm.name] = perm._id)
      );
      setPermissionsMap(permissionsMap);

      const rolesMap = {};
      rolesResponse.data.forEach((role) => (rolesMap[role.name] = role._id));
      setRolesMap(rolesMap);
    } catch (error) {
      console.error("Error fetching roles and permissions:", error);
    }
  }, [baseURL]);

  // console.log("Permissions Map:", permissionsMap);
  // console.log("Roles Map:", rolesMap);
  // console.log("User Permissions:", state.permissions);
  // console.log("User Roles:", state.roles);

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

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: response.data.user,
          permissions: response.data.allPermissionIds, // Map this correctly
          roles: response.data.roles, // Map this correctly
        },
      });
    } catch (error) {
      console.error("Error verifying token:", error);
      dispatch({ type: "LOGOUT" });
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  const hasPermission = (permissionName) => {
    const permissionId = permissionsMap[permissionName];
    return permissionId ? state.permissions.includes(permissionId) : false;
  };

  const hasAnyPermission = (permissionNames) =>
    permissionNames.some(hasPermission);
  const hasAllPermissions = (permissionNames) =>
    permissionNames.every(hasPermission);

  const hasRole = (roleName) =>
    rolesMap[roleName] ? state.roles.includes(rolesMap[roleName]) : false;
  const hasAnyRole = (roleNames) => roleNames.some(hasRole);
  const hasAllRoles = (roleNames) => roleNames.every(hasRole);

  // Run once on mount
  useEffect(() => {
    checkAuth();
    fetchPermissionsAndRoles();
  }, [checkAuth, fetchPermissionsAndRoles]);

  const adminAuthInfo = {
    loading,
    error,
    ...state,
    isAuthenticated: state.isAuthenticated,
    adminData: state.adminData,
    loginAdmin,
    logoutAdmin,
    checkAuth,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    hasAllRoles,
  };

  return (
    <AdminAuthContext.Provider value={adminAuthInfo}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
