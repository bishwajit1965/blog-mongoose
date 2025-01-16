import AdminAuthContext from "../adminAuthContext/AdminAuthContext";
import { useContext } from "react";

const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

export default useAdminAuth;
