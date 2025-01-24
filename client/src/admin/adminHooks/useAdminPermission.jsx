import AdminPermissionContext from "../adminContexts/AdminPermissionContext";
import { useContext } from "react";

const useAdminPermission = () => {
  const context = useContext(AdminPermissionContext);
  if (context === undefined) {
    throw new Error(
      "useAdminPermission must be used within an AdminPermissionProvider"
    );
  }
  return context;
};

export default useAdminPermission;
