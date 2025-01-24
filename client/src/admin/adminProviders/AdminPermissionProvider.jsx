import { useEffect, useState } from "react";

import AdminPermissionContext from "../adminContexts/AdminPermissionContext";
import { getAllPermissions } from "../adminServices/permissionService";

const AdminPermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const permissionData = await getAllPermissions();
      setPermissions(permissionData);
    } catch (error) {
      console.error("Error in fetching roles.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const addPermissionToState = (permission) => {
    setPermissions((prev) => [...prev, permission]);
  };

  const updatePermissionInState = (updatedPermission) => {
    setPermissions((prev) =>
      prev.map((permission) =>
        permission._id === updatedPermission._id
          ? updatedPermission
          : permission
      )
    );
  };

  const adminPermissionInfo = {
    permissions,
    loading,
    fetchPermissions,
    addPermissionToState,
    updatePermissionInState,
  };

  return (
    <AdminPermissionContext.Provider value={adminPermissionInfo}>
      {children}
    </AdminPermissionContext.Provider>
  );
};

export default AdminPermissionProvider;
