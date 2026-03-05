import { io } from "socket.io-client";
import useAdminNotification from "../../adminHooks/useAdminNotification";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create singleton socket outside component
let socket = null;

const AutoPublishNotification = () => {
  const { accessToken } = useAuth();
  const addNotification = useAdminNotification();

  useEffect(() => {
    if (!accessToken) return;

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
  }, [accessToken, addNotification]);

  return null;
};

export default AutoPublishNotification;

// import { io } from "socket.io-client";
// import useAdminNotification from "../../adminHooks/useAdminNotification";
// import { useEffect } from "react";

// const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const socket = io(`${apiURL}`); // Ensure this matches your backend

// const AutoPublishNotification = () => {
//   const addNotification = useAdminNotification();

//   useEffect(() => {
//     const handlePublishAlert = (message) => {
//       addNotification(message); // Show notification dynamically
//     };

//     socket.on("publish-alert", handlePublishAlert);

//     return () => {
//       socket.off("publish-alert", handlePublishAlert); // Cleanup on unmount
//     };
//   }, [addNotification]);

//   return null; // No UI needed, just listens for events
// };

// export default AutoPublishNotification;
