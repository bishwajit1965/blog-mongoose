import { FaEdit, FaTrashAlt } from "react-icons/fa";

import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import { deleteTag } from "../../adminServices/tagService";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useAdminTag from "../../adminHooks/useAdminTag";
import { useState } from "react";

const TagsTable = ({ onEdit, onDelete }) => {
  const { tags } = useAdminTag();
  const { adminData } = useAdminAuth();

  // Pagination state
  const [paginatedData, setPaginatedData] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      try {
        await deleteTag(id);
        alert("Tag deleted successfully!");
        onDelete();
      } catch (error) {
        console.error("Error deleting tag:", error);
        alert("Failed to delete tag.");
      }
    }
  };

  return (
    <>
      <table className="table table-xs w-full">
        <thead>
          <tr className="dark:border-gray-700 dark:text-gray-400 font-bold">
            <th>#</th>
            <th>Tag Name</th>
            <th>Tag Slug</th>
            <th className="lg:flex lg:justify-end lg:mr-12">Actions</th>
          </tr>
        </thead>

        <tbody className="dark:hover:bg-gray-700 dark:hover:rounded-md">
          {paginatedData?.map((tag, index) => (
            <tr
              key={tag._id}
              className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
            >
              <td>{index + 1}</td>
              <td className="capitalize">{tag.name}</td>
              <td>{tag.slug}</td>
              <td className="flex space-x-1 justify-end p-0">
                {Array.isArray(adminData?.user?.roles) &&
                adminData.user.roles.some(
                  (role) => role.name === "super-admin" || role.name === "admin"
                ) ? (
                  <>
                    <CTAButton
                      onClick={() => onEdit(tag)}
                      label="Edit"
                      icon={<FaEdit />}
                      className="btn btn-xs text-xs"
                      variant="primary"
                    />
                    <CTAButton
                      onClick={() => handleDelete(tag._id)}
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
        items={tags}
        onPaginatedDataChange={setPaginatedData} // Directly update paginated data
      />
    </>
  );
};

export default TagsTable;
