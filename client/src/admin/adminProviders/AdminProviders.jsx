// src/admin/adminProviders/AdminProviders.jsx (THE MASTER WRAPPER)
import AdminAuthProviders from "./groups/AdminAuthProviders";
import AdminNotificationProviders from "./groups/AdminNotificationProviders";
import AdminDataProviders from "./groups/AdminDataProviders";

const AdminProviders = ({ children }) => {
  return (
    <AdminAuthProviders>
      <AdminNotificationProviders>
        <AdminDataProviders>{children}</AdminDataProviders>
      </AdminNotificationProviders>
    </AdminAuthProviders>
  );
};

export default AdminProviders;
