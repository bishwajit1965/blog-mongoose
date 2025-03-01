import { FaEdit, FaTrashAlt } from "react-icons/fa";

import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import { deleteCategory } from "../../adminServices/categoryService";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useAdminCategory from "../../adminHooks/useAdminCategory";
import { useState } from "react";

const CategoriesTable = ({ onEdit, onDelete }) => {
  const { categories, fetchCategories } = useAdminCategory();
  const { adminData } = useAdminAuth();

  // Pagination state
  const [paginatedData, setPaginatedData] = useState(categories || []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        alert("Category deleted successfully!");
        fetchCategories();
        onDelete();
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category.");
      }
    }
  };
  return (
    <>
      <table className="table table-xs w-full">
        <thead>
          <tr className="dark:border-gray-700 dark:text-gray-400 font-bold">
            <th>#</th>
            <th>Category Name</th>
            <th>Category Description</th>
            <th className="lg:flex lg:justify-end lg:mr-12">Actions</th>
          </tr>
        </thead>

        <tbody className="dark:hover:bg-gray-700 dark:hover:rounded-md">
          {paginatedData?.map((category, index) => (
            <tr
              key={category._id}
              className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
            >
              <td>{index + 1}</td>
              <td className="capitalize">{category.name}</td>
              <td>{category.description}</td>
              <td className="flex space-x-1 justify-end p-0">
                {Array.isArray(adminData?.user?.roles) &&
                adminData.user.roles.some(
                  (role) => role.name === "super-admin" || role.name === "admin"
                ) ? (
                  <>
                    <CTAButton
                      onClick={() => onEdit(category)}
                      label="Edit"
                      icon={<FaEdit />}
                      className="btn btn-xs text-xs"
                      variant="primary"
                    />
                    <CTAButton
                      onClick={() => handleDelete(category._id)}
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
        items={categories}
        onPaginatedDataChange={setPaginatedData} // Directly update paginated data
      />
    </>
  );
};

export default CategoriesTable;
