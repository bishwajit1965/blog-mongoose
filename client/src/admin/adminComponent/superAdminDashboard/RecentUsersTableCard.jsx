import AdminCardTitle from "../../adminCardTitle/AdminCardTitle";
import AdminPagination from "../adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaEye } from "react-icons/fa";
import UserModal from "./UserModal";
import useSocketConnection from "../../../../../server/helpers/useSocketConnection";
import { useState } from "react";

const RecentUsersTableCard = ({ recentUsers }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [paginatedData, setPaginatedData] = useState(recentUsers || []);

  const { onlineUsers } = useSocketConnection();

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
