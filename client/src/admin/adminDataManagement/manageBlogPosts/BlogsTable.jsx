import {
  FaAccessibleIcon,
  FaEdit,
  FaEye,
  FaRecycle,
  FaTrashAlt,
} from "react-icons/fa";
import {
  permanentDeleteBlogBySlug,
  restoreSoftDeletedPost,
  softDeletePost,
} from "../../adminServices/blogService";

import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import SearchInput from "../../adminComponent/searchInput/SearchInput";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import { useState } from "react";

const BlogsTable = ({
  blogs,
  onEdit,
  onDelete,
  handleBlogDetailView,
  isHidden,
  toggler,
}) => {
  const { adminData, hasPermission } = useAdminAuth();

  const [paginatedData, setPaginatedData] = useState(blogs);

  // Restore soft deleted blog post
  const handleRestore = async (slug) => {
    if (window.confirm("Are you sure you want to restore this blog?")) {
      try {
        if (hasPermission("restore-post")) {
          await restoreSoftDeletedPost(slug);
          alert("Blog restored successfully!");
          await onDelete();
        }
      } catch (error) {
        console.error("Error restoring blog:", error);
        alert("Failed to restore blog.");
      }
    }
  };

  //Handle soft delete blog post
  const handleSoftDelete = async (slug) => {
    if (window.confirm("Are you sure you want to soft delete this blog?")) {
      try {
        if (hasPermission("delete-post")) {
          await softDeletePost(slug);
          alert("Blog soft deleted successfully!");
          await onDelete();
        }
      } catch (error) {
        console.error("Error in deleting blog:", error);
        alert("Failed to delete blog.");
      }
    }
  };

  // Handle permanent delete blog post
  const handlePermanentDelete = async (slug) => {
    if (
      window.confirm("Are you sure you want to permanently delete this blog?")
    ) {
      try {
        if (hasPermission("delete-post")) {
          await permanentDeleteBlogBySlug(slug);
          alert("Blog deleted successfully!");
          await onDelete();
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog.");
      }
    }
  };
  return (
    <div className="">
      {/* Search input functionality */}
      <SearchInput data={blogs} onFilteredDataChange={setPaginatedData} />

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
              <td>
                {blog.status === "published"
                  ? "Published"
                  : blog.status === "draft"
                  ? "Draft"
                  : blog.status === "deleted"
                  ? "Deleted"
                  : blog.status === "scheduled"
                  ? "Scheduled"
                  : blog.status === "coming-soon"
                  ? "Coming Soon"
                  : blog.status === "archived"
                  ? "Archived"
                  : "N/A"}
              </td>

              <td className="flex space-x-1 justify-end pr-0">
                {Array.isArray(adminData?.user?.roles) &&
                adminData.user.roles.some(
                  (role) => role.name === "super-admin" || role.name === "admin"
                ) ? (
                  <>
                    <CTAButton
                      onClick={() => onEdit(blog)}
                      label="EDIT"
                      icon={<FaEdit />}
                      className="btn btn-xs text-xs"
                      variant="primary"
                    />
                    <CTAButton
                      onClick={() => handleBlogDetailView(blog)}
                      label="VIEW"
                      icon={<FaEye />}
                      className="btn btn-xs text-xs"
                      variant="primary"
                    />
                    {blog.status === "deleted" &&
                    hasPermission("restore-post") ? (
                      <CTAButton
                        onClick={() => handleRestore(blog.slug)}
                        label="RESTORE"
                        icon={<FaRecycle />}
                        className="btn btn-xs text-xs"
                        variant="success"
                      />
                    ) : (
                      <CTAButton
                        onClick={() => handleSoftDelete(blog.slug)}
                        label="S-DEL"
                        icon={<FaAccessibleIcon />}
                        className="btn btn-xs text-xs"
                        variant="warning"
                      />
                    )}
                    <CTAButton
                      onClick={() => handlePermanentDelete(blog._id)}
                      label="DEL"
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
      <AdminPagination items={blogs} onPaginatedDataChange={setPaginatedData} />
      <div className="">
        <CTAButton
          onClick={() => toggler()}
          label="Toggler"
          icon={<FaTrashAlt />}
          className="btn btn-xs text-xs"
          variant="primary"
        />
      </div>
    </div>
  );
};

export default BlogsTable;
