import { useCallback, useEffect, useState } from "react";

import AdminAuditLogContext from "../adminContexts/AdminAuditLogContext";
import { getAllAuditLogs } from "../adminServices/auditLogService";

const AdminAuditLogContextProvider = ({ children }) => {
  const [auditLogs, setAuditLogs] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchAllAuditLogs = useCallback(async () => {
    try {
      setLoading(true);
      const [auditLogResponse] = await Promise.all([getAllAuditLogs()]);

      setAuditLogs(auditLogResponse);
    } catch (err) {
      console.error("Error fetching audit logs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllAuditLogs();
  }, [fetchAllAuditLogs]);

  const auditLogInfo = { auditLogs, loading, fetchAllAuditLogs };

  return (
    <AdminAuditLogContext.Provider value={auditLogInfo}>
      {children}
    </AdminAuditLogContext.Provider>
  );
};

export default AdminAuditLogContextProvider;
