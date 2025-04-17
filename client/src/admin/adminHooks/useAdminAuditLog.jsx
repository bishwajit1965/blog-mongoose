import AdminAuditLogContext from "../adminContexts/AdminAuditLogContext";
import { useContext } from "react";

const useAdminAuditLog = () => {
  const context = useContext(AdminAuditLogContext);
  if (context === undefined) {
    throw new Error(
      "useAdminAuditLog must be used within an AdminAuditLogContextProvider"
    );
  }
  return context;
};

export default useAdminAuditLog;
