import { FaEdit, FaTrashAlt } from "react-icons/fa";

import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import { deleteUser } from "../../adminServices/userService";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useAdminPermission from "../../adminHooks/useAdminPermission";
import useAdminRole from "../../adminHooks/useAdminRole";
import useAdminUser from "../../adminHooks/useAdminUser";
import { useState } from "react";

const UsersTable = ({ onDelete, onEdit }) => {
  const { users, fetchUsers } = useAdminUser();
  const { adminData } = useAdminAuth();
  const { permissions } = useAdminPermission();
  const { roles } = useAdminRole();

  // Pagination state
  const [paginatedData, setPaginatedData] = useState(users || []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        alert("User deleted successfully!");
        fetchUsers();
        onDelete();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <table className="min-w-full table table-xs dark:border-b-gray-700">
        <thead>
          <tr className="dark:border-gray-700 dark:text-gray-400 font-bold">
            <th>#</th>
            <th>Email</th>
            <th>Role</th>
            <th>Permission</th>
            <th className="lg:flex lg:justify-end lg:mr-12">Actions</th>
          </tr>
        </thead>

        <tbody className="dark:hover:bg-gray-700 dark:hover:rounded-md">
          {paginatedData?.map((user, index) => (
            <tr
              key={user._id}
              className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
            >
              <td>{index + 1}</td>
              <td>{user?.email}</td>
              <td className="capitalize">
                {user?.roles?.map((roleId, index) => {
                  const matchingRole = roles.find((r) => r._id === roleId._id);
                  if (matchingRole) {
                    return index === user.roles.length - 1
                      ? matchingRole.name
                      : matchingRole.name.concat(", ");
                  }
                  return null;
                })}
              </td>
              <td className="capitalize">
                {user?.permissions?.map((permissionId, index) => {
                  const matchingPermissions = permissions.find(
                    (p) => p._id === permissionId._id
                  );
                  if (matchingPermissions) {
                    return index === user.permissions.length - 1
                      ? matchingPermissions.name
                      : matchingPermissions.name.concat(", ");
                  }
                  return null;
                })}
              </td>
              <td className="flex space-x-1 justify-end p-0">
                {Array.isArray(adminData?.user?.roles) &&
                adminData?.user?.roles?.some(
                  (role) => role.name === "super-admin" || role.name === "admin"
                ) ? (
                  <>
                    <CTAButton
                      onClick={() => onEdit(user)}
                      label="Edit"
                      icon={<FaEdit />}
                      className="btn btn-xs text-xs"
                      variant="primary"
                    />
                    <CTAButton
                      onClick={() => handleDelete(user._id)}
                      label="Delete"
                      icon={<FaTrashAlt />}
                      className="btn btn-xs text-xs"
                      variant="danger"
                    />
                  </>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <AdminPagination
        items={users}
        onPaginatedDataChange={setPaginatedData} // Directly update paginated data
      />
    </div>
  );
};

export default UsersTable;
