import { FaEye, FaStoreAltSlash } from "react-icons/fa";

import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import { archiveBlog } from "../../adminServices/archivedBlogService";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import { useState } from "react";
import useToggleViewModal from "../../adminHooks/useToggleViewModal";

const ArchiveBlogPostTable = ({ blogs, loading, onSuccess }) => {
  const { isOpen, modalData, openModal, closeModal } = useToggleViewModal();
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { adminData, hasPermission } = useAdminAuth();
  const [paginatedData, setPaginatedData] = useState(blogs || []);
  const [archiving, setArchiving] = useState(null); // Track which blog is being archived

  //Handle archive blog post
  const handleArchiveBlogPost = async (slug) => {
    setArchiving(slug); // Set loading state for the specific blog
    if (window.confirm("Are you sure you want to archive this post?")) {
      try {
        if (hasPermission("archive-post")) {
          await archiveBlog(slug);
          alert("Blog post archived successfully!");
          await onSuccess();
        }
      } catch (error) {
        console.error("Error in deleting blog:", error);
        alert("Failed to archive blog post.");
      }
    }
  };
  let serial = 1;
  return (
    <>
      {loading && <AdminLoader />}
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
                          onClick={() => openModal(blog)}
                          label="VIEW"
                          icon={<FaEye />}
                          className="btn btn-xs text-xs"
                          variant="primary"
                        />
                        <CTAButton
                          onClick={() => handleArchiveBlogPost(blog.slug)}
                          label={
                            archiving === blog.slug ? "Archiving..." : "Archive"
                          }
                          disabled={loading}
                          icon={
                            archiving === blog.slug ? (
                              <AdminLoader />
                            ) : (
                              <FaStoreAltSlash />
                            )
                          }
                          className="btn btn-xs text-xs"
                          variant="primary"
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
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <AdminPagination
          items={blogs}
          onPaginatedDataChange={setPaginatedData} // Directly update paginated data
        />

        {/* Modal Section */}
        {isOpen && modalData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-4 rounded shadow-lg max-w-xl w-full">
              <div className="h-">
                <img
                  src={`${apiURL}${modalData.image}`}
                  alt={modalData.title}
                  className="rounded-md w-full h-64 shadow-md"
                />
              </div>
              <h2 className="text-xl font-bold">{modalData.title}</h2>
              <div className="my-2 mt-2 max-h-60 overflow-y-auto p-2 border rounded">
                {/* <p className="mt-2">{modalData.content}</p> */}
                <p
                  className="indent-7"
                  dangerouslySetInnerHTML={{
                    __html: modalData?.content ? modalData.content : "N/A",
                  }}
                />
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
      </div>
    </>
  );
};

export default ArchiveBlogPostTable;
