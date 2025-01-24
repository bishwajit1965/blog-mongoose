import { FaEdit, FaTrashAlt } from "react-icons/fa";

import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import { deletePermission } from "../../adminServices/permissionService";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useAdminPermission from "../../adminHooks/useAdminPermission";
import { useState } from "react";

const PermissionsTable = ({ onDelete, onEdit }) => {
  const { permissions } = useAdminPermission();
  const { adminData } = useAdminAuth();
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const permissionsPerPage = 10; // Number of roles per page

  // Calculate pagination values
  const totalPages = Math.ceil(permissions?.length / permissionsPerPage);
  const startIndex = (currentPage - 1) * permissionsPerPage;
  const currentPermissions = permissions?.slice(
    startIndex,
    startIndex + permissionsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this permission?")) {
      try {
        await deletePermission(id);
        alert("Permission deleted successfully!");
        onDelete();
      } catch (error) {
        console.error("Error deleting permission:", error);
        alert("Failed to delete permission.");
      }
    }
  };

  return (
    <>
      <table className="table table-xs w-full">
        <thead>
          <tr className="dark:border-gray-700 dark:text-gray-400 font-bold">
            <th>#</th>
            <th>Permission Name</th>
            <th>Permission Description</th>
            <th className="lg:flex lg:justify-end lg:mr-12">Actions</th>
          </tr>
        </thead>

        <tbody className="dark:hover:bg-gray-700 dark:hover:rounded-md">
          {currentPermissions?.map((permission, index) => (
            <tr
              key={permission._id}
              className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
            >
              <td>{index + 1}</td>
              <td>{permission.name}</td>
              <td>{permission.description}</td>
              <td className="flex space-x-1 justify-end p-0">
                {adminData?.roles == "admin" ? (
                  <>
                    <CTAButton
                      onClick={() => onEdit(permission)}
                      label="Edit"
                      icon={<FaEdit />}
                      className="btn btn-xs text-xs"
                      variant="primary"
                    />
                    <CTAButton
                      onClick={() => handleDelete(permission._id)}
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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PermissionsTable;
