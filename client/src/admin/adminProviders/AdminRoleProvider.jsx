import { useEffect, useState } from "react";

import AdminRoleContext from "../adminContexts/AdminRoleContext";
import { getAllRoles } from "../adminServices/roleService";

const AdminRoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const rolesData = await getAllRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error("Error in fetching roles.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const addRoleToState = (role) => {
    setRoles((prev) => [...prev, role]);
  };

  const updateRoleInState = (updatedRole) => {
    setRoles((prev) =>
      prev.map((role) => (role._id === updatedRole._id ? updatedRole : role))
    );
  };

  const adminRoleInfo = {
    roles,
    loading,
    fetchRoles,
    addRoleToState,
    updateRoleInState,
  };

  return (
    <AdminRoleContext.Provider value={adminRoleInfo}>
      {children}
    </AdminRoleContext.Provider>
  );
};

export default AdminRoleProvider;
