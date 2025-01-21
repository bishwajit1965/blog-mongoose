import { FaEdit, FaTrashAlt } from "react-icons/fa";

import CTAButton from "../../../components/buttons/CTAButton";
import { deletePermission } from "../../adminServices/permissionService";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useAdminPermission from "../../adminHooks/useAdminPermission";

const PermissionsTable = ({ onDelete, onEdit }) => {
  const { permissions } = useAdminPermission();
  const { adminData } = useAdminAuth();

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
    <table className="table table-xs w-full">
      <thead>
        <tr className="dark:border-gray-700 dark:text-gray-400 font-bold">
          <th>#</th>
          <th>Permission Name</th>
          <th>Permission Description</th>
          <th className="lg:flex lg:justify-end lg:mr-20">Actions</th>
        </tr>
      </thead>

      <tbody className="dark:hover:bg-gray-700 dark:hover:rounded-md">
        {permissions?.map((permission, index) => (
          <tr
            key={permission._id}
            className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
          >
            <td>{index + 1}</td>
            <td>{permission.name}</td>
            <td>{permission.description}</td>
            <td className="flex m-0 space-x-2 justify-end">
              {adminData?.roles == "admin" ? (
                <>
                  <CTAButton
                    onClick={() => onEdit(permission)}
                    label="Edit"
                    icon={<FaEdit />}
                    className="btn btn-sm"
                    variant="primary"
                  />
                  <CTAButton
                    onClick={() => handleDelete(permission._id)}
                    label="Delete"
                    icon={<FaTrashAlt />}
                    className="btn btn-sm"
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
  );
};

export default PermissionsTable;
