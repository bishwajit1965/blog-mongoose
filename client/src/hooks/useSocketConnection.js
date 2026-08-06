import { useEffect, useState } from "react";

import { io } from "socket.io-client";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const socket = io(`${apiURL}`, {
  withCredentials: true,
  autoConnect: false,
});

const useSocketConnection = (userId = null) => {
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => console.log("✅ Socket Connected:", socket.id));

    socket.on("update-users", (onlineUserIds) => {
      console.log("🔄 Updated Online Users:", onlineUserIds);
      setOnlineUsers(new Set(onlineUserIds));
    });

    return () => {
      socket.off("update-users");
    };
  }, []);

  const isUserOnline = userId ? onlineUsers.has(String(userId)) : false;

  return { onlineUsers, isUserOnline };
};

export default useSocketConnection;
