import { useContext } from "react";
import AdminAuthContext from "../adminProviders/auth/AdminAuthContext";

const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export default useAdminAuth;
