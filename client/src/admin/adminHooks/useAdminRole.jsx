import AdminRoleContext from "../adminContexts/AdminRoleContext";
import { useContext } from "react";

const useAdminRole = () => {
  return useContext(AdminRoleContext);
};

export default useAdminRole;
