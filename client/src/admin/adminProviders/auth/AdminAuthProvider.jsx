import { useCallback, useEffect, useReducer, useState } from "react";
import api from "../../../services/api";
import { Loader } from "lucide-react";
import AdminAuthContext from "./AdminAuthContext";

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
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);
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
        (perm) => (permissionsMap[perm.name] = perm._id),
      );

      setPermissionsMap(permissionsMap);

      const rolesMap = {};
      rolesResponse.data.forEach((role) => (rolesMap[role.name] = role._id));
      setRolesMap(rolesMap);
    } catch (error) {
      console.error("Error fetching roles and permissions:", error);
    }
  }, []);

  const loginAdmin = async (credentials) => {
    try {
      setIsLoggingIn(true); // ⬅️ Prevent automatic checkAuth during login
      setLoading(true);
      setError(null);
      const response = await api.post("/admin/login", credentials);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: response?.data?.user,
          permissions: response?.data?.allPermissionIds || [],
          roles: response?.data?.roles || [],
        },
      });

      return response?.data?.user;
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
      throw error;
    } finally {
      setLoading(false);
      setIsLoggingIn(false); // ⬅️ Re-enable checkAuth after login
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

      // 1️⃣ Try fetching user info
      let response = await api.get("/admin/me");

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: response?.data?.user,
          permissions: response?.data?.allPermissionIds || [],
          roles: response?.data?.roles || [],
        },
      });
    } catch (error) {
      console.error("Error verifying token:", error);

      // 2️⃣ If 401, try refresh once
      if (error?.response?.status === 401) {
        try {
          console.log("Attempting to refresh token...");
          await api.post("/admin/refresh-token");

          // Retry fetching user info after refresh
          const retryResponse = await api.get("/admin/me");

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user: retryResponse?.data?.user,
              permissions: retryResponse?.data?.allPermissionIds || [],
              roles: retryResponse?.data?.roles || [],
            },
          });

          return; // ✅ Exit after successful retry
        } catch (refreshError) {
          // 3️⃣ Any other failure or failed refresh → log out
          dispatch({ type: "LOGOUT" });
          console.error("Token refresh failed, logging out", refreshError);
        }
      }
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
    const init = async () => {
      if (!isLoggingIn) {
        try {
          await checkAuth();
        } catch (err) {
          console.error(err);
        } finally {
          console.log("Auth initialized");
          setAuthInitialized(true);
        }
      }
    };

    init();
    fetchPermissionsAndRoles();
  }, [checkAuth, fetchPermissionsAndRoles, isLoggingIn]);

  if (!authInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={30} />
      </div>
    );
  }

  const adminAuthInfo = {
    loading,
    error,
    ...state,
    authInitialized,
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
