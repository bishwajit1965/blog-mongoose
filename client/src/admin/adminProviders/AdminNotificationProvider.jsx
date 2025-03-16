import AdminNotificationContext from "../adminContexts/AdminNotificationContext";
import AdminNotificationDisplay from "../adminComponent/AdminNotificationDisplay/AdminNotificationDisplay";
import { useState } from "react";

const AdminNotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const addNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1)); // Auto remove after sometime
    }, 5000);
  };

  return (
    <AdminNotificationContext.Provider value={addNotification}>
      {children}
      <AdminNotificationDisplay notifications={notifications} />
    </AdminNotificationContext.Provider>
  );
};

export default AdminNotificationProvider;
