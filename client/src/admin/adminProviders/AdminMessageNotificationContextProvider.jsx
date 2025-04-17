import {
  getActiveNotifications,
  getAllNotifications,
} from "../adminServices/notificationApiService";
import { useCallback, useEffect, useState } from "react";

import AdminMessageNotificationContext from "../adminContexts/AdminMessageNotificationContext";

const AdminMessageNotificationContextProvider = ({ children }) => {
  const [allMessageNotification, setAllMessageNotification] = useState([]);
  const [activeMessageNotification, setActiveMessageNotification] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  console.log("All message notifications:", allMessageNotification);

  const fetchAdminMessageNotification = useCallback(async () => {
    try {
      setLoading(true);
      const [
        allMessageNotificationResponse,
        activeMessageNotificationResponse,
      ] = await Promise.all([getAllNotifications(), getActiveNotifications()]);
      setAllMessageNotification(
        allMessageNotificationResponse?.notifications || []
      );
      setActiveMessageNotification(
        activeMessageNotificationResponse?.notifications || []
      );
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminMessageNotification();
  }, [fetchAdminMessageNotification]);

  const adminMessageNotificationInfo = {
    loading,
    allMessageNotification,
    activeMessageNotification,
    fetchAdminMessageNotification,
  };

  return (
    <AdminMessageNotificationContext.Provider
      value={adminMessageNotificationInfo}
    >
      {children}
    </AdminMessageNotificationContext.Provider>
  );
};

export default AdminMessageNotificationContextProvider;
