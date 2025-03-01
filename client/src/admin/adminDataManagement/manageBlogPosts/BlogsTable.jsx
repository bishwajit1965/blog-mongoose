import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import { deleteBlogBySlug } from "../../adminServices/blogService";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import { useState } from "react";

const BlogsTable = ({
  blogs,
  onEdit,
  onDelete,
  fetchBlogsCategoriesAndTags,
  handleBlogDetailView,
}) => {
  const { adminData } = useAdminAuth();

  // Pagination state
  const [paginatedData, setPaginatedData] = useState(blogs || []);

  const handleDelete = async (slug) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlogBySlug(slug);
        alert("Blog deleted successfully!");
        fetchBlogsCategoriesAndTags();
        onDelete();
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog.");
      }
    }
  };
  return (
    <div>
      <table className="table table-xs w-full">
        <thead>
          <tr className="dark:border-gray-700 dark:text-gray-400 font-bold">
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th className="lg:flex lg:justify-end lg:mr-12">Actions</th>
          </tr>
        </thead>

        <tbody className="dark:hover:bg-gray-700 dark:hover:rounded-md">
          {paginatedData?.map((blog, index) => (
            <tr
              key={blog._id}
              className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
            >
              <td>{index + 1}</td>
              <td className="capitalize">{blog.title}</td>
              <td>{blog.status}</td>
              <td className="flex space-x-1 justify-end pr-0">
                {Array.isArray(adminData?.user?.roles) &&
                adminData.user.roles.some(
                  (role) => role.name === "super-admin" || role.name === "admin"
                ) ? (
                  <>
                    <CTAButton
                      onClick={() => onEdit(blog)}
                      label="Edit"
                      icon={<FaEdit />}
                      className="btn btn-xs text-xs w-18"
                      variant="primary"
                    />
                    <CTAButton
                      onClick={() => handleBlogDetailView(blog)}
                      label="View"
                      icon={<FaEye />}
                      className="btn btn-xs text-xs w-18"
                      variant="primary"
                    />
                    <CTAButton
                      onClick={() => handleDelete(blog._id)}
                      label="Delete"
                      icon={<FaTrashAlt />}
                      className="btn btn-xs text-xs w-18"
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
        items={blogs}
        onPaginatedDataChange={setPaginatedData} // Directly update paginated data
      />
    </div>
  );
};

export default BlogsTable;
