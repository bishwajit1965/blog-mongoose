import { Navigate, useLocation } from "react-router-dom";

import AdminLoader from "../adminComponent/adminLoader/AdminLoader";
import useAdminAuth from "../adminHooks/useAdminAuth";

const RequireAdmin = ({ children }) => {
  const { loading, isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (loading) return <AdminLoader />;

  if (!isAuthenticated) {
    return (
      <Navigate to="/admin/login" state={{ from: location }} replace={true} />
    );
  }

  return children;
};

export default RequireAdmin;
