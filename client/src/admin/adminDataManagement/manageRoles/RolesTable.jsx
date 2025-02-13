import { FaEdit, FaTrashAlt } from "react-icons/fa";

import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import { deleteRole } from "../../adminServices/roleService";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useAdminPermission from "../../adminHooks/useAdminPermission";
import useAdminRole from "../../adminHooks/useAdminRole";
import { useState } from "react";

const RolesTable = ({ onDelete, onEdit }) => {
  const { permissions } = useAdminPermission();
  const { roles } = useAdminRole();
  const { adminData } = useAdminAuth();

  // Pagination state
  const [paginatedData, setPaginatedData] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await deleteRole(id);
        alert("Role deleted successfully!");
        onDelete();
      } catch (error) {
        console.error("Error deleting role:", error);
        alert("Failed to delete role.");
      }
    }
  };

  return (
    <>
      <table className="table table-xs w-full">
        <thead>
          <tr className="dark:border-gray-700 dark:text-gray-400 font-bold">
            <th>#</th>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Role Description</th>
            <th className="lg:flex lg:justify-end lg:pr-14">Actions</th>
          </tr>
        </thead>
        <tbody className="dark:hover:bg-gray-700 dark:hover:rounded-md">
          {paginatedData?.map((role, index) => (
            <tr
              key={role._id}
              className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
            >
              <td>{index + 1}</td>
              <td className="capitalize">{role.name}</td>
              <td>
                {role.permissions.map((perId, index) => {
                  const matchingPermission = permissions.find(
                    (perm) => perm._id === perId
                  );
                  if (matchingPermission) {
                    // Check if it's the last item
                    return index === role.permissions.length - 1
                      ? matchingPermission.name
                      : matchingPermission.name.concat(", ");
                  }
                  return null;
                })}
              </td>
              <td>{role.description}</td>
              <td className="flex p-0 space-x-1 justify-end">
                {Array.isArray(adminData?.user?.roles) &&
                adminData.user.roles.some(
                  (role) => role.name === "super-admin" || role.name === "admin"
                ) ? (
                  <>
                    <CTAButton
                      onClick={() => onEdit(role)}
                      label="Edit"
                      icon={<FaEdit />}
                      className="btn btn-xs text-xs"
                      variant="primary"
                    />
                    <CTAButton
                      onClick={() => handleDelete(role._id)}
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
        items={roles}
        onPaginatedDataChange={setPaginatedData} // Directly update paginated data
      />
    </>
  );
};

export default RolesTable;
