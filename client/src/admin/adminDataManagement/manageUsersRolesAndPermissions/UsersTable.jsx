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
  const { users } = useAdminUser();
  const { adminData } = useAdminAuth();
  const { permissions } = useAdminPermission();
  const { roles } = useAdminRole();

  // Pagination state
  const [paginatedData, setPaginatedData] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this permission?")) {
      try {
        await deleteUser(id);
        alert("Permission deleted successfully!");
        onDelete();
      } catch (error) {
        console.error("Error deleting permission:", error);
        alert("Failed to delete permission.");
      }
    }
  };

  return (
    <div>
      <table className="table table-xs w-full">
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
              <td>
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
              <td>
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
