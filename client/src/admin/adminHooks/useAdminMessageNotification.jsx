import AdminMessageNotificationContext from "../adminProviders/notifications/AdminMessageNotificationContext";
import { useContext } from "react";

const useAdminMessageNotification = () => {
  const context = useContext(AdminMessageNotificationContext);
  if (context === undefined) {
    throw new Error(
      "useAdminMessageNotification must be used within AdminMessageNotificationContextProvider",
    );
  }

  return context;
};

export default useAdminMessageNotification;
