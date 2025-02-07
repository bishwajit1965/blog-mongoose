import AdminAuthContext from "../adminContexts/AdminAuthContext";
import { useContext } from "react";

const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export default useAdminAuth;
