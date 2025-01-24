import AdminRoleContext from "../adminContexts/AdminRoleContext";
import { useContext } from "react";

const useAdminRole = () => {
  const context = useContext(AdminRoleContext);
  if (context === undefined) {
    throw new Error("useAdminRole must be used within an AdminRoleProvider");
  }
  return context;
};

export default useAdminRole;
