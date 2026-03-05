import { Navigate, useLocation } from "react-router-dom";
import AdminLoader from "../adminComponent/adminLoader/AdminLoader";
import useAdminAuth from "../adminHooks/useAdminAuth";

const RequireAdmin = ({ children, allowedRoles = [] }) => {
  const { adminData, authInitialized, isAuthenticated, loading } =
    useAdminAuth();
  const location = useLocation();

  // 1️⃣ Still loading auth state
  if (!authInitialized || loading) {
    return <AdminLoader />;
  }

  // 2️⃣ Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 3️⃣ Extract roles safely
  const userRoles = adminData?.user?.roles?.map((role) => role.name) || [];

  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

  // 4️⃣ Role-based access
  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RequireAdmin;
