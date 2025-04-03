import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
import {
  approveFlaggedBlog,
  rejectFlaggedBlog,
} from "../../adminServices/flaggedBlogService";

import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import Swal from "sweetalert2";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import { useState } from "react";
import useToggleViewModal from "../../adminHooks/useToggleViewModal";

const FlaggedPostsTable = ({
  flaggedBlogPosts,
  loading,
  onFetchedBlogPostsSuccess,
}) => {
  const { adminData, hasPermission } = useAdminAuth();
  const [approving, setApproving] = useState(null);
  const [rejecting, setRejecting] = useState(null);
  const [filter, setFilter] = useState("all"); // New state for dropdown filter
  const { isOpen, modalData, openModal, closeModal } = useToggleViewModal();
  const [paginatedData, setPaginatedData] = useState(flaggedBlogPosts || []);
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  console.log("Flagged Blog post Data", flaggedBlogPosts);

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    // Here you can add logic to filter flagged posts based on the selected filter
    // For now, it just logs the selected filter
    console.log("Selected filter:", selectedFilter);
  };

  const handleApproveFlaggedBlogPost = async (slug) => {
    setApproving(slug);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to approve this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    });

    if (result.isConfirmed) {
      try {
        if (hasPermission("approve-post")) {
          await approveFlaggedBlog(slug, "approved");
          await Swal.fire({
            title: "Approved!",
            text: "This post has been approved successfully.",
            icon: "success",
          });
        } else {
          await Swal.fire({
            title: "Permission Denied",
            text: "You do not have permission to approve this post!",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error in approving blog:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to approve the blog post.",
          icon: "error",
        });
      } finally {
        setApproving(null);
        await onFetchedBlogPostsSuccess();
      }
    } else {
      setApproving(null);
    }
  };

  const handleRejectFlaggedBlogPost = async (slug) => {
    setRejecting(slug);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to review & reject this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    });

    if (result.isConfirmed) {
      try {
        if (hasPermission("reject-post")) {
          await rejectFlaggedBlog(slug);
          await Swal.fire({
            title: "Rejected!",
            text: "This post has been reviewed & rejected successfully.",
            icon: "success",
          });
        } else {
          await Swal.fire({
            title: "Permission Denied",
            text: "You do not have permission to reject this post!",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error in rejecting blog:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to reject the blog post.",
          icon: "error",
        });
      } finally {
        setRejecting(null);
        await onFetchedBlogPostsSuccess();
      }
    } else {
      setRejecting(null); // Reset loading state if the user cancels
    }
  };

  return (
    <div>
      {loading && <AdminLoader />}
      <div className="my-4">
        <label htmlFor="filter" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="border p-2 rounded-md"
        >
          <option value="all">All Posts</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <table className="table table-xs w-full dark:border-gray-700 rounded-md shadow-md">
        <thead className="dark:border-gray-700 bg-gray-200 dark:text-gray-400 font-bold dark:bg-gray-900">
          <tr className="bg-gray-200 dark:bg-gray-700 dark:border-gray-700">
            <th className="p-1 text-left py-2 text-gray-800 font-bold dark:text-gray-300">
              #
            </th>
            <th className="p-1 text-left py-2 text-gray-800 font-bold dark:text-gray-300">
              Id
            </th>
            <th className="p-1 text-left py-2 text-gray-800 font-bold dark:text-gray-300">
              Post Title
            </th>
            <th className="p-1 text-left py-2 text-gray-800 font-bold dark:text-gray-300">
              Slug
            </th>
            <th className="p-1 text-left py-2 text-gray-800 font-bold dark:text-gray-300">
              Flagged By
            </th>
            <th className="p-1 text-left py-2 text-gray-800 font-bold dark:text-gray-300">
              Reason
            </th>
            <th className="p-1 text-left py-2 text-gray-800 font-bold dark:text-gray-300">
              Flagged At
            </th>
            <th className="p-1 text-left py-2 text-gray-800 font-bold dark:text-gray-300">
              Review Status
            </th>
            <th className="p-1 text-left py-2 text-gray-800 font-bold dark:text-gray-300">
              Flag Count
            </th>
            <th className="p-1 text-center py-2 text-gray-800 font-bold dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="dark:hover:bg-gray-700 dark:hover:rounded-md">
          {paginatedData.length > 0 ? (
            paginatedData.map((post, index) => (
              <tr
                key={post._id}
                className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
              >
                <td className="p-2">{index + 1}</td>
                <td>{post._id}</td>
                <td className="p-2">
                  <a
                    href={`/blog/${post?.postId?.slug}`}
                    className="text-blue-500"
                  >
                    {post?.postId?.title.slice(0, 20)}...
                  </a>
                </td>
                <td>{post?.flaggedSlug}</td>
                <td className="p-2">
                  {post?.flaggedBy.map((user) => user?.name).join(", ")}
                </td>
                <td className="p-2">{post?.flaggedReason.join(", ")}</td>
                <td className="p-2">
                  {new Date(post?.flaggedAt[0]).toLocaleString()}
                </td>
                <td className="p-2">{post?.reviewStatus}</td>
                <td className="p-2">{post?.postId?.flagCount}</td>
                <td className="flex items-center justify-end space-x-1 pr-1">
                  {Array.isArray(adminData?.user?.roles) &&
                  adminData.user.roles.some(
                    (role) =>
                      role.name === "super-admin" || role.name === "admin"
                  ) ? (
                    <>
                      <CTAButton
                        onClick={() => openModal(post)}
                        label="View"
                        icon={<FaEye />}
                        className="btn btn-xs text-xs"
                        variant="primary"
                      />

                      {/* If the post is being reviewed, show approve and reject buttons */}
                      {post?.reviewStatus === "pending" && (
                        <>
                          <CTAButton
                            onClick={() =>
                              handleApproveFlaggedBlogPost(post?.flaggedSlug)
                            }
                            label={
                              approving === post?.flaggedSlug
                                ? "Approving..."
                                : "Approve"
                            }
                            disabled={loading}
                            icon={
                              approving === post?.flaggedSlug ? (
                                <AdminLoader />
                              ) : (
                                <FaCheck />
                              )
                            }
                            className="btn btn-xs text-xs"
                            variant="success"
                          />
                          <CTAButton
                            onClick={() =>
                              handleRejectFlaggedBlogPost(post?.flaggedSlug)
                            }
                            label={
                              rejecting === post?.flaggedSlug
                                ? "Rejecting..."
                                : "Reject"
                            }
                            disabled={loading}
                            icon={
                              rejecting === post?.flaggedSlug ? (
                                <AdminLoader />
                              ) : (
                                <FaTimes />
                              )
                            }
                            className="btn btn-xs text-xs"
                            variant="danger"
                          />
                        </>
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
                No flagged data is available!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="py-6">
        <AdminPagination
          items={flaggedBlogPosts}
          onPaginatedDataChange={setPaginatedData} // Directly update paginated data
        />
      </div>

      {/* Modal Section */}
      {isOpen && modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-xl w-full">
            <div className="h-64">
              <img
                src={`${apiURL}${modalData?.postId?.image}`}
                alt={modalData?.postId?.title}
                className="rounded-md w-full h-64 shadow-md"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-600">
              {modalData?.postId?.title}
            </h2>
            <div className="my-2 mt-2 max-h-60 overflow-y-auto p-2 border rounded ">
              <p
                dangerouslySetInnerHTML={{ __html: modalData.content }}
                className="prose max-w-none list-decimal text-gray-600"
              ></p>
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
  );
};

export default FlaggedPostsTable;
