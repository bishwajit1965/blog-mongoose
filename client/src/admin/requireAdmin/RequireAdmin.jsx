import { Navigate, useLocation } from "react-router-dom";

import AdminLoader from "../adminComponent/adminLoader/AdminLoader";
import useAdminAuth from "../adminHooks/useAdminAuth";

const RequireAdmin = ({ children, allowedRoles = [] }) => {
  const { loading, isAuthenticated, adminData } = useAdminAuth();
  const location = useLocation();

  if (loading) return <AdminLoader />;

  if (!isAuthenticated) {
    return (
      <Navigate to="/admin/login" state={{ from: location }} replace={true} />
    );
  }

  // Safely access `roles` from the user object, or fallback to an empty array
  const userRoles = adminData?.roles || [];

  // Check if user has any of the allowed roles
  const hasAccess = userRoles?.map((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace={true} />;
  }

  return children;
};

export default RequireAdmin;
