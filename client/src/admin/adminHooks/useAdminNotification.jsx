import AdminNotificationContext from "../adminProviders/notifications/AdminNotificationContext";
import { useContext } from "react";

const useAdminNotification = () => {
  const context = useContext(AdminNotificationContext);
  if (context === undefined) {
    throw new Error(
      "useAdminNotification must be used within an AdminNotificationProvider",
    );
  }
  return context;
};

export default useAdminNotification;
