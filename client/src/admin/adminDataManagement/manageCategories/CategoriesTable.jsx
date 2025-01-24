import { FaEdit, FaTrashAlt } from "react-icons/fa";

import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import { deleteCategory } from "../../adminServices/categoryService";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useAdminCategory from "../../adminHooks/useAdminCategory";
import { useState } from "react";

const CategoriesTable = ({ onEdit, onDelete }) => {
  const { categories } = useAdminCategory();
  const { adminData } = useAdminAuth();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10; // Number of roles per page

  // Calculate pagination values
  const totalPages = Math.ceil(categories?.length / categoriesPerPage);
  const startIndex = (currentPage - 1) * categoriesPerPage;
  const currentCategories = categories?.slice(
    startIndex,
    startIndex + categoriesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        alert("Category deleted successfully!");
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
          {currentCategories?.map((category, index) => (
            <tr
              key={category._id}
              className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
            >
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td className="flex space-x-1 justify-end p-0">
                {adminData?.roles == "admin" ? (
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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CategoriesTable;
