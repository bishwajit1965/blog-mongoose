import { io } from "socket.io-client";
import useAdminNotification from "../../adminHooks/useAdminNotification";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create singleton socket outside component
let socket = null;

const AutoPublishNotification = () => {
  const { accessToken, isAuthenticated } = useAuth();
  const addNotification = useAdminNotification();

  useEffect(() => {
    if (!accessToken || !isAuthenticated) return;

    if (!socket) {
      socket = io(`${apiURL}`, {
        transports: ["websocket"],
        auth: { token: accessToken },
      });
    }

    const handlePublishAlert = (message) => {
      addNotification(message);
    };

    socket.on("publish-alert", handlePublishAlert);

    return () => {
      socket.off("publish-alert", handlePublishAlert);
    };
  }, [accessToken, isAuthenticated, addNotification]);

  return null;
};

export default AutoPublishNotification;
