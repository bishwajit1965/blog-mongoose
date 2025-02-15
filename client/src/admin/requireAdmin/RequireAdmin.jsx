import { Navigate, useLocation } from "react-router-dom";

import AdminLoader from "../adminComponent/adminLoader/AdminLoader";
import useAdminAuth from "../adminHooks/useAdminAuth";

const RequireAdmin = ({ children, allowedRoles = [] }) => {
  const { adminData, isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!adminData) {
    return <AdminLoader />;
  }

  // Ensure roles are always an array of strings
  const userRoles = adminData?.user?.roles?.map((role) => role.name) || []; // Extract role names as strings

  // Check if the user has any of the allowed roles
  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

  if (!isAuthenticated) {
    return (
      <Navigate to="/admin/login" state={{ from: location }} replace={true} />
    );
  }

  return hasAccess ? children : <Navigate to="/unauthorized" replace={true} />;
};

export default RequireAdmin;
