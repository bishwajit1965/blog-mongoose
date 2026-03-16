import { useContext } from "react";
import AdminMessageContext from "../adminProviders/notifications/AdminMessageContext";

const useAdminContactMessages = () => {
  const context = useContext(AdminMessageContext);
  if (context === undefined) {
    throw new Error(
      "useAdminContactMessage must be used within an AdminMessageProviders",
    );
  }
  return context;
};

export default useAdminContactMessages;
