import AdminPagination from "../../admin/adminComponent/adminPagination/AdminPagination";
import Button from "../../components/buttons/Button";
import { FaEye } from "react-icons/fa";
import UserProfileModal from "./UserProfileModal";
import useApiQuery from "../../hooks/useApiQuery";
import { useState } from "react";

const UserList = () => {
  const { data, isLoading } = useApiQuery({
    key: "user-profile",
    url: "/users/profile",
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const [paginatedData, setPaginatedData] = useState(data || []);

  if (isLoading) return <div className="flex justify-center">Loading...</div>;
  if (!data) return <div className="flex justify-center">No data found</div>;

  const openUserProfile = (user) => {
    setSelectedUser(user);
  };

  const closeUserProfile = () => {
    setSelectedUser(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">User List</h2>
      <ul className="space-y-2">
        {paginatedData.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded"
          >
            <span>{user.name}</span>

            <Button
              label="View Profile"
              icon={<FaEye />}
              className="btn btn-sm"
              variant="white"
              onClick={() => openUserProfile(user)}
            />
          </li>
        ))}
      </ul>

      <div className="lg:pt-6">
        <AdminPagination
          items={data}
          onPaginatedDataChange={setPaginatedData}
        />
      </div>

      {selectedUser && (
        <UserProfileModal user={selectedUser} closeModal={closeUserProfile} />
      )}
    </div>
  );
};

export default UserList;
