import { useEffect, useState } from "react";

import AdminCardTitle from "../../adminCardTitle/AdminCardTitle";
import AdminPagination from "../adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaEye } from "react-icons/fa";
import UserModal from "./UserModal";
import { io } from "socket.io-client"; // Import socket.io-client

const socket = io("http://localhost:3000", {
  withCredentials: true,
  autoConnect: false,
});

const RecentUsersTableCard = ({ recentUsers }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [paginatedData, setPaginatedData] = useState(recentUsers || []);
  const [onlineUsers, setOnlineUsers] = useState(new Set()); // Store online user IDs

  // Listen for real-time updates
  useEffect(() => {
    // Ensure socket connects when the component mounts
    socket.connect();

    // Log socket connection
    socket.on("connect", () => {
      console.log("✅ Socket Connected:", socket.id);
    });

    // Log updates to the online users
    socket.on("update-users", (onlineUserIds) => {
      console.log("🔄 Updated Online Users:", onlineUserIds);
      setOnlineUsers(new Set(onlineUserIds)); // Update the online users state
    });

    // Clean up on unmount
    return () => {
      socket.off("update-users");
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <div className="lg:col-span-6 col-span-12 rounded-md shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
      <AdminCardTitle
        subTitle="Recent Users"
        decoratedText="Data"
        dataLength={recentUsers.length}
      />

      <div className="pb-2">
        <table className="table-auto table-sm text-sm w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-600">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td>
                  {onlineUsers.has(String(user._id)) ? (
                    <span className="text-green-500 font-bold">🟢 Online</span>
                  ) : (
                    <span className="text-gray-500">🔴 Offline</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  <CTAButton
                    onClick={() => setSelectedUser(user)}
                    label="View"
                    icon={<FaEye />}
                    className="btn btn-xs text-xs"
                    variant="primary"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <AdminPagination
          items={recentUsers}
          onPaginatedDataChange={setPaginatedData}
        />

        {/* User Modal */}
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      </div>
    </div>
  );
};

export default RecentUsersTableCard;
