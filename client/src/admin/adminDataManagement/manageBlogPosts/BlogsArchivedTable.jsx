import { FaEye, FaStoreAltSlash, FaTrashRestore } from "react-icons/fa";
import {
  restoreArchivedBlog,
  softDeleteArchivedBlog,
} from "../../adminServices/archivedBlogService";

import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import { useState } from "react";
import useToggleViewModal from "../../adminHooks/useToggleViewModal";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const BlogsArchivedTable = ({ archivedBlogs, loading, onSuccess }) => {
  const { adminData, hasPermission } = useAdminAuth();
  const [paginatedData, setPaginatedData] = useState(archivedBlogs || []);
  const [restoring, setRestoring] = useState(null);
  const [softDeleting, setSoftDeleting] = useState(null);
  const { isOpen, modalData, openModal, closeModal } = useToggleViewModal();

  //Handle archive blog post
  const handleRestoreBlogPost = async (slug) => {
    setRestoring(slug); // Set loading state for the specific blog
    if (window.confirm("Are you sure you want to restore this post?")) {
      try {
        if (hasPermission("restore-post")) {
          await restoreArchivedBlog(slug);
          alert("Blog post restored successfully!");
          await onSuccess();
        }
      } catch (error) {
        console.error("Error in restoring blog:", error);
        alert("Failed to restore blog post.");
      }
    }
  };

  // Handle soft delete
  const handleSoftDelete = async (slug) => {
    setSoftDeleting(slug);
    if (window.confirm("Are you sure you want to restore this post?")) {
      try {
        if (hasPermission("restore-post")) {
          await softDeleteArchivedBlog(slug);
          alert("Blog post restored successfully!");
          await onSuccess();
        }
      } catch (error) {
        console.error("Error in restoring blog:", error);
        alert("Failed to restore blog post.");
      }
    }
  };

  let serial = 1;

  return (
    <>
      {loading && <AdminLoader />}
      <AdminSubTitle
        subTitle="Archived"
        decoratedText="Blog Posts"
        dataLength={archivedBlogs?.length ? archivedBlogs.length : "0"}
      />

      {/* Modal Section */}
      {isOpen && modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-xl w-full">
            <div className="h-auto">
              <img
                src={`${apiURL}${modalData.image}`}
                alt={modalData.title}
                className="rounded-md w-full h-64 shadow-md"
              />
            </div>
            <h2 className="text-xl font-bold">{modalData.title}</h2>
            <div className="my-2 mt-2 max-h-60 overflow-y-auto p-2 border rounded">
              <p className="mt-2">{modalData.content}</p>
            </div>
            <div className="text-right">
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table table-xs w-full dark:border-gray-700 rounded-md shadow-md">
          <thead className="dark:border-gray-700 bg-gray-200 dark:text-gray-400 font-bold dark:bg-gray-900">
            <tr className="dark:border-gray-700 dark:text-gray-400 font-bold">
              <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                #
              </th>
              <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                Title
              </th>
              <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                Author
              </th>
              <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                Category
              </th>
              <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                Status
              </th>
              <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                Tags
              </th>
              <th className="text-center py-2 text-gray-800 font-bold dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="dark:hover:bg-gray-700 dark:hover:rounded-md">
            {paginatedData.length > 0 ? (
              paginatedData.map((blog) => (
                <tr
                  key={blog._id}
                  className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
                >
                  <td>{serial++}</td>
                  <td className="">{blog.title}</td>
                  <td className="">{blog.author?.name || "Unknown"}</td>
                  <td className="">{blog.category?.name || "Uncategorized"}</td>
                  <td className="">{blog.status || "Uncategorized"}</td>
                  <td className="">
                    {blog.tags?.map((tag) => (
                      <span
                        key={tag._id}
                        className="bg-gray-300 shadow-sm dark:bg-gray-600 dark:text-white text-gray-950 px-2 py-1 text-xs rounded-full mr-1"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </td>
                  <td className="flex items-center justify-end space-x-1">
                    {Array.isArray(adminData?.user?.roles) &&
                    adminData.user.roles.some(
                      (role) =>
                        role.name === "super-admin" || role.name === "admin"
                    ) ? (
                      <>
                        <CTAButton
                          onClick={() => handleRestoreBlogPost(blog.slug)}
                          label={
                            restoring === blog.slug ? "Restoring..." : "Restore"
                          }
                          disabled={loading}
                          icon={
                            restoring === blog.slug ? (
                              <AdminLoader />
                            ) : (
                              <FaStoreAltSlash />
                            )
                          }
                          className="btn btn-xs text-xs"
                          variant="info"
                        />

                        <CTAButton
                          onClick={() => openModal(blog)}
                          label="View"
                          disabled={loading}
                          icon={<FaEye />}
                          className="btn btn-xs text-xs"
                          variant="primary"
                        />

                        <CTAButton
                          onClick={() => handleSoftDelete(blog.slug)}
                          label={
                            softDeleting === blog.slug
                              ? "Soft Deleting..."
                              : "S-Delete"
                          }
                          disabled={loading}
                          icon={
                            softDeleting === blog.slug ? (
                              <AdminLoader />
                            ) : (
                              <FaTrashRestore />
                            )
                          }
                          className="btn btn-xs text-xs"
                          variant="danger"
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No archived blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <AdminPagination
          items={archivedBlogs}
          onPaginatedDataChange={setPaginatedData} // Directly update paginated data
        />
      </div>
    </>
  );
};

export default BlogsArchivedTable;
