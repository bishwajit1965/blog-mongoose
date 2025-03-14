import { useCallback, useEffect, useReducer, useState } from "react";

import AdminAuthContext from "../adminContexts/AdminAuthContext";
import api from "../../services/api";

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

  const fetchPermissionsAndRoles = useCallback(async () => {
    try {
      const [permissionsResponse, rolesResponse] = await Promise.all([
        api.get("/permissions"),
        api.get("/roles"),
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
  }, []);

  // console.log("Permissions Map:", permissionsMap);
  // console.log("Roles Map:", rolesMap);
  // console.log("User Permissions:", state.permissions);
  // console.log("User Roles:", state.roles);

  const loginAdmin = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/admin/login", credentials);
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
      await api.post("/admin/logout");
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
      const response = await api.get("/admin/me");

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
      if (error.response?.status === 401) {
        try {
          // Try refreshing the token
          console.log("Attempting to refresh token...");
          await api.post("/admin/refresh-token");

          // Retry fetching user info
          const response = await api.get("/admin/me");

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user: response.data.user,
              permissions: response.data.allPermissionIds,
              roles: response.data.roles,
            },
          });

          return;
        } catch (refreshError) {
          console.error("Token refresh failed, logging out", refreshError);
        }
      }

      dispatch({ type: "LOGOUT" });
    } finally {
      setLoading(false);
    }
  }, []);

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
