import { Navigate, useLocation } from "react-router-dom";

import Loader from "../../components/loader/Loader";
import useAdminAuth from "../adminHooks/useAdminAuth";

const RequireAdmin = ({ children }) => {
  const location = useLocation();
  const { loading, isAuthenticated, adminData } = useAdminAuth();

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return (
      <Navigate to="/admin/login" state={{ from: location }} replace={true} />
    );
  }

  if (!adminData?.roles.includes("admin")) {
    // Redirect to a generic unauthorized page if user is not an admin
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default RequireAdmin;
