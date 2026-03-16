// src/admin/adminProviders/groups/AdminAuthProviders.jsx
import AdminAuthProvider from "../auth/AdminAuthProvider";
import AdminRoleProvider from "../auth/AdminRoleProvider";
import AdminPermissionProvider from "../auth/AdminPermissionProvider";

const AdminAuthProviders = ({ children }) => {
  return (
    <AdminAuthProvider>
      <AdminRoleProvider>
        <AdminPermissionProvider>{children}</AdminPermissionProvider>
      </AdminRoleProvider>
    </AdminAuthProvider>
  );
};

export default AdminAuthProviders;