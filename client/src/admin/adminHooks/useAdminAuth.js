import AdminAuthContext from "../adminAuthProvider/AdminAuthProvider";
import { useContext } from "react";

const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

export default useAdminAuth;
