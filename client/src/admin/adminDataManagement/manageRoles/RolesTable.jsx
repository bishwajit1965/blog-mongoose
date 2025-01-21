import { FaEdit, FaTrashAlt } from "react-icons/fa";

import CTAButton from "../../../components/buttons/CTAButton";
import { deleteRole } from "../../adminServices/roleService";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useAdminRole from "../../adminHooks/useAdminRole";

const RolesTable = ({ onDelete, onEdit }) => {
  const { roles } = useAdminRole();
  const { adminData } = useAdminAuth();

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
    <table className="table table-xs w-full">
      <thead>
        <tr className="dark:border-gray-700 dark:text-gray-400 font-bold">
          <th>#</th>
          <th>Role Name</th>
          <th>Role Description</th>
          <th className="lg:flex lg:justify-end lg:mr-20">Actions</th>
        </tr>
      </thead>
      <tbody className="dark:hover:bg-gray-700 dark:hover:rounded-md">
        {roles?.map((role, index) => (
          <tr
            key={role._id}
            className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
          >
            <td>{index + 1}</td>
            <td>{role.name}</td>
            <td>{role.description}</td>
            <td className="flex m-0 space-x-2 justify-end">
              {adminData?.roles == "admin" ? (
                <>
                  <CTAButton
                    onClick={() => onEdit(role)}
                    label="Edit"
                    icon={<FaEdit />}
                    className="btn btn-sm"
                    variant="primary"
                  />
                  <CTAButton
                    onClick={() => handleDelete(role._id)}
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

export default RolesTable;
