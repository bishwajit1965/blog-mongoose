import {
  FaAccessibleIcon,
  FaEdit,
  FaEye,
  FaRecycle,
  FaTrashAlt,
} from "react-icons/fa";

import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import SearchInput from "../../adminComponent/searchInput/SearchInput";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import { useState } from "react";

const BlogsTable = ({
  blogs,
  onEdit,
  handleBlogDetailView,
  onSelectSoftDeleteBlog,
  onSelectRestorePost, // Restores soft deleted select handler
  onSelectPermanentDelete, // Permanent delete select handler
}) => {
  const { adminData, hasPermission } = useAdminAuth();

  const [paginatedData, setPaginatedData] = useState(blogs || []);

  return (
    <div className="pb-4 mb-2 shadow-md pr-2 rounded-b-lg">
      {/* Search input functionality */}
      <SearchInput data={blogs} onFilteredDataChange={setPaginatedData} />
      <div className="overflow-x-auto">
        <table className="table table-xs w-full table-pin-rows table-pin-cols">
          <thead className="dark:bg-gray-700">
            <tr className="dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 font-bold">
              <th className="dark:bg-gray-800">#</th>
              <th className="dark:bg-gray-800">Title</th>
              <th className="dark:bg-gray-800">Status</th>
              <th className="dark:bg-gray-800 lg:flex lg:justify-end lg:mr-12">
                Actions
              </th>
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
                    (role) =>
                      role.name === "super-admin" || role.name === "admin",
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
                          onClick={() => onSelectRestorePost(blog)}
                          label="RESTORE"
                          icon={<FaRecycle />}
                          className="btn btn-xs text-xs"
                          variant="success"
                        />
                      ) : (
                        <CTAButton
                          onClick={() => onSelectSoftDeleteBlog(blog)}
                          label="S-DEL"
                          icon={<FaAccessibleIcon />}
                          className="btn btn-xs text-xs"
                          variant="warning"
                        />
                      )}

                      <CTAButton
                        onClick={() => onSelectPermanentDelete(blog)}
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
      </div>
      {/* Pagination */}
      <AdminPagination items={blogs} onPaginatedDataChange={setPaginatedData} />
    </div>
  );
};

export default BlogsTable;
