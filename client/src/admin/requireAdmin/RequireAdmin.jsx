import { Navigate, useLocation } from "react-router-dom";
import AdminLoader from "../adminComponent/adminLoader/AdminLoader";
import useAdminAuth from "../adminHooks/useAdminAuth";

const RequireAdmin = ({ children, allowedRoles = [] }) => {
  const { adminData, authInitialized, isAuthenticated, loading } =
    useAdminAuth();

  const location = useLocation();

  /**==========================
   |* VERIFYING GUARDS
   |**=========================*/
  //1️⃣ Still loading auth state
  if (loading) {
    return <AdminLoader />;
  }

  //2️⃣ If auth is initialized
  if (!authInitialized) return <AdminLoader />;

  //3️⃣ Not logged in Only redirect if authInitialized is done
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  //4️⃣ Extract roles safely
  const userRoles = adminData?.user?.roles?.map((role) => role.name) || [];

  //5️⃣ If has the required role
  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

  //6️⃣ Role-based access
  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  //✅ Allowed
  return children;
};

export default RequireAdmin;
