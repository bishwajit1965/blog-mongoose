import AdminPermissionContext from "../adminContexts/AdminPermissionContext";
import { useContext } from "react";

const useAdminPermission = () => {
  return useContext(AdminPermissionContext);
};

export default useAdminPermission;
