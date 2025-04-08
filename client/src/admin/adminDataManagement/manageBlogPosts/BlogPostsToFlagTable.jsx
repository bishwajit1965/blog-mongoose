import { FaEye, FaFlag, FaTimes } from "react-icons/fa";

import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import Swal from "sweetalert2";
import { flagPost } from "../../adminServices/blogService";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import { useState } from "react";
import useToggleViewModal from "../../adminHooks/useToggleViewModal";

const BlogPostsToFlagTable = ({
  blogs,
  loading,
  onSuccess,
  onFetchedBlogPostsSuccess,
}) => {
  const { adminData, hasPermission } = useAdminAuth();
  const isBanned = adminData?.user?.isBanned;
  const [paginatedData, setPaginatedData] = useState(blogs || []);
  const { isOpen, modalData, openModal, closeModal } = useToggleViewModal();
  const [flagging, setFlagging] = useState(null); // Track which blog is being archived
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleFlagBlogPost = async (slug) => {
    setFlagging(slug); // Set loading state for the specific blog

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to flag this post. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, flag it!",
    });

    if (result.isConfirmed) {
      try {
        if (hasPermission("flag-post")) {
          await flagPost(slug);
          await Swal.fire({
            title: "Flagged!",
            text: "This post has been flagged successfully.",
            icon: "success",
          });
        } else {
          await Swal.fire({
            title: "Permission Denied",
            text: "You do not have permission to flag this post!",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error in flagging blog:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to flag the blog post.",
          icon: "error",
        });
      } finally {
        setFlagging(null);
        await onSuccess();
        await onFetchedBlogPostsSuccess();
      }
    } else {
      setFlagging(null); // Reset loading state if the user cancels
    }
  };

  return (
    <div>
      <div>
        {loading && <AdminLoader />}
        <div className="overflow-x-auto">
          <table className="table table-xs w-full dark:border-gray-700 rounded-md shadow-md">
            <thead className="dark:border-gray-700 bg-gray-200 dark:text-gray-400 font-bold dark:bg-gray-900">
              <tr className="dark:border-gray-700 dark:text-gray-400 font-bold dark:bg-gray-700">
                <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                  #
                </th>
                <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                  Title
                </th>
                <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                  Slug
                </th>
                <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                  Author
                </th>
                <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                  Category
                </th>
                <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                  Review Status
                </th>
                <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                  Status
                </th>
                <th className="text-left py-2 text-gray-800 font-bold dark:text-gray-300">
                  FCount
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
                paginatedData.map((blog, index) => (
                  <tr
                    key={blog._id}
                    className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
                  >
                    <td>{index + 1}</td>
                    <td className="">{blog?.title.slice(0, 30)}...</td>
                    <td>{blog?.slug.slice(0, 20)}</td>
                    <td className="">{blog?.author?.name || "Unknown"}</td>
                    <td className="">
                      {blog?.category?.name || "Uncategorized"}
                    </td>
                    <td className="">{blog?.reviewStatus}</td>
                    <td className="">{blog?.status || "Uncategorized"}</td>
                    <td className="">{blog?.flagCount || "N/A"}</td>
                    <td className="">
                      {blog?.tags?.map((tag) => (
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
                            label="View"
                            icon={<FaEye />}
                            className="btn btn-xs text-xs"
                            variant="primary"
                          />
                          {!blog.isFlagged === true ? (
                            <CTAButton
                              onClick={() => handleFlagBlogPost(blog?.slug)}
                              label={
                                flagging === blog.slug ? "Flagging..." : "Flag"
                              }
                              disabled={isBanned}
                              icon={
                                flagging === blog.slug ? (
                                  <AdminLoader />
                                ) : (
                                  <FaFlag />
                                )
                              }
                              className="btn btn-xs text-xs"
                              variant="primary"
                            />
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No flagged blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="py-4">
          <AdminPagination
            items={blogs}
            onPaginatedDataChange={setPaginatedData} // Directly update paginated data
          />
        </div>

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
              <h2 className="text-xl font-bold text-gray-600">
                {modalData.title}
              </h2>
              <div className="my-2 mt-2 max-h-60 overflow-y-auto p-2 border rounded">
                <p
                  dangerouslySetInnerHTML={{ __html: modalData.content }}
                  className="prose max-w-none list-decimal text-gray-600"
                ></p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded flex items-center shadow-md"
                >
                  <FaTimes className="mr-1" /> Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostsToFlagTable;
