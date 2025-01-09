import Loader from "../../components/loader/Loader";
import { Navigate } from "react-router-dom";
import useAdminAuth from "../adminHooks/useAdminAuth";

const RequireAdmin = ({ children }) => {
  const { user, loading } = useAdminAuth();

  if (loading) return <Loader />;

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default RequireAdmin;
