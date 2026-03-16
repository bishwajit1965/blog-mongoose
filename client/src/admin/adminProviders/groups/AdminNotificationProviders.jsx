// src/admin/adminProviders/groups/AdminNotificationProviders.jsx
import AdminMessageNotificationContextProvider from "../notifications/AdminMessageNotificationContextProvider";
import AdminNotificationProvider from "../notifications/AdminNotificationProvider";
import AdminMessageProviders from "../notifications/AdminMessageProviders";

const AdminNotificationProviders = ({ children }) => {
  return (
    <AdminMessageNotificationContextProvider>
      <AdminNotificationProvider>
        <AdminMessageProviders>{children}</AdminMessageProviders>
      </AdminNotificationProvider>
    </AdminMessageNotificationContextProvider>
  );
};

export default AdminNotificationProviders;
