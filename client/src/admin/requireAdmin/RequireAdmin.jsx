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

  console.log("1. RequireAdmin - Full Admin Data:", adminData);
  console.log("2. RequireAdmin - Allowed Roles:", allowedRoles);
  console.log("3. RequireAdmin - Authenticated:", isAuthenticated);
  console.log("4. RequireAdmin - User's roles:", userRoles);

  // Check if the user has any of the allowed roles
  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));
  console.log("5. RequireAdmin - Access Status:", hasAccess);

  if (!isAuthenticated) {
    console.warn("🚨 6. User not authenticated. Redirecting to login.");
    return (
      <Navigate to="/admin/login" state={{ from: location }} replace={true} />
    );
  }

  // Debugging role comparison issue
  const normalizedUserRoles = userRoles.map((role) => role.toLowerCase());
  const normalizedAllowedRoles = allowedRoles.map((role) => role.toLowerCase());

  console.log("7. RequireAdmin - Normalized User Roles:", normalizedUserRoles);
  console.log(
    "8. RequireAdmin - Normalized Allowed Roles:",
    normalizedAllowedRoles
  );

  if (!hasAccess) {
    console.warn(
      "🚨 9. User lacks required roles. Redirecting to Unauthorized."
    );
    return <Navigate to="/unauthorized" replace={true} />;
  }

  console.log("10. RequireAdmin - Access granted, rendering children");
  return children;
  // return hasAccess ? children : <Navigate to="/unauthorized" replace={true} />;
};

export default RequireAdmin;
