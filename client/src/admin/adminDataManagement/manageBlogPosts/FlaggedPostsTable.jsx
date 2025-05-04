import {
  FaCheck,
  FaClock,
  FaEnvelope,
  FaEye,
  FaFlag,
  FaHistory,
  FaRecycle,
  FaTimes,
} from "react-icons/fa";
import {
  approveFlaggedBlog,
  rejectFlaggedBlog,
  revertFlaggedBlogStatus,
} from "../../adminServices/flaggedBlogService";
import { useMemo, useState } from "react";

import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import Swal from "sweetalert2";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useToggleViewModal from "../../adminHooks/useToggleViewModal";

const FlaggedPostsTable = ({
  flaggedBlogPosts,
  loading,
  onFetchedBlogPostsSuccess,
}) => {
  const { adminData, hasPermission } = useAdminAuth();
  const [approving, setApproving] = useState(null);
  const [rejecting, setRejecting] = useState(null);
  const [reverting, setReverting] = useState(null);
  const [filter, setFilter] = useState("all"); // New state for dropdown filter
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, modalData, openModal, closeModal } = useToggleViewModal();
  const [paginatedData, setPaginatedData] = useState(flaggedBlogPosts || []);

  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  console.log("Modal data:", modalData);
  console.log("Flagged Blog Posts:", flaggedBlogPosts);

  const processedData = useMemo(() => {
    if (!flaggedBlogPosts) return [];
    let filtered = flaggedBlogPosts;
    // Filter by reviewStatus
    if (filter !== "all") {
      filtered = filtered.filter((post) => post.reviewStatus === filter);
    }
    // Search by title
    if (searchQuery.trim() !== "") {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((post) => {
        const title = post?.postId?.title?.trim().toLowerCase?.();
        return title && title?.includes(q);
      });
    }

    return filtered;
  }, [flaggedBlogPosts, filter, searchQuery]);

  const formatDateTime = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString)
      .toLocaleString("en-US", options)
      .replace(",", " -");
  };

  const handleApproveFlaggedBlogPost = async (slug) => {
    setApproving(slug);

    const predefinedComments = [
      "Approving - Violation confirmed.",
      "Approving - Inappropriate or harmful content.",
      "Approving - Post contains spam.",
      "Approving - Offensive or abusive language.",
      "Approving - Misinformation or false claims",
      "Approving - Violates community guidelines",
      "Approving - Sensitive or disturbing content",
      "Approving - Content incites hate or violence",
    ];

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to approve this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
      input: "select", // Dropdown for selecting predefined comment
      inputOptions: predefinedComments.reduce((acc, comment, idx) => {
        acc[idx] = comment;
        return acc;
      }, {}),
      inputPlaceholder: "Select a review comment",
      showLoaderOnConfirm: true,
      preConfirm: (selectedIdx) => {
        if (selectedIdx === null || selectedIdx === undefined) {
          Swal.showValidationMessage("Please select a comment.");
          return;
        }
        const selectedComment = predefinedComments[selectedIdx];
        return selectedComment; // Ensure that the selected comment is returned
      },
    });

    if (result.isConfirmed) {
      const reviewComment = result.value;
      if (!reviewComment) {
        console.error("No review comment selected!");
        return;
      }

      try {
        if (hasPermission("approve-post")) {
          // Send the review comment to the backend
          await approveFlaggedBlog(slug, reviewComment); // Pass reviewComment as argument
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

    const predefinedComments = [
      "Rejecting - No violation found.",
      "Rejecting - Content is appropriate.",
      "Rejecting - Flag lacks sufficient reason.",
      "Rejecting - Post complies with community guidelines.",
      "Rejecting - Misunderstanding — content is within acceptable limits.",
      "Rejecting - False or frivolous flag.",
      "Rejecting - No evidence of policy breach.",
      "Rejecting - Personal bias or disagreement detected",
    ];

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to review & reject this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
      input: "select", // Dropdown for selecting predefined comment
      inputOptions: predefinedComments.reduce((acc, comment, idx) => {
        acc[idx] = comment;
        return acc;
      }, {}),
      inputPlaceholder: "Select a review comment",
      showLoaderOnConfirm: true,
      preConfirm: (selectedIdx) => {
        if (selectedIdx === null || selectedIdx === undefined) {
          Swal.showValidationMessage("Please select a comment.");
          return;
        }
        const selectedComment = predefinedComments[selectedIdx];
        return selectedComment; // Ensure that the selected comment is returned
      },
    });

    if (result.isConfirmed) {
      const reviewComment = result.value;
      if (!reviewComment) {
        console.error("No review comment selected!");
        return;
      }
      try {
        if (hasPermission("reject-post")) {
          await rejectFlaggedBlog(slug, reviewComment);
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

  const verifyFlaggedBlogPostReviewLimit = async () => {
    await Swal.fire({
      title: "Review Limit Exceeded",
      text: "This post has already been reviewed 3 times.",
      icon: "warning",
    });
    setReverting(null); // Reset loading state
    await onFetchedBlogPostsSuccess();
  };

  const handleResetReviewStatus = async (slug, post) => {
    if (post.reviewHistory.length >= 3) {
      verifyFlaggedBlogPostReviewLimit();
      return;
    }
    if (reverting === slug) return; // Prevent multiple clicks
    setReverting(slug);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to revert post review status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, revert it!",
    });

    if (result.isConfirmed) {
      try {
        if (hasPermission("undo-reviewed-post")) {
          await revertFlaggedBlogStatus(slug);
          await Swal.fire({
            title: "Reverted!",
            text: "This post status has been reverted successfully.",
            icon: "success",
          });
        } else {
          await Swal.fire({
            title: "Permission Denied",
            text: "You do not have permission to revert this post!",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error in reverting blog:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to revert the blog post.",
          icon: "error",
        });
      } finally {
        setReverting(null);
        await onFetchedBlogPostsSuccess();
      }
    } else {
      setReverting(null); // Reset loading state if the user cancels
    }
  };

  return (
    <div>
      {loading && <AdminLoader />}
      <div className="grid lg:grid-cols-12 grid-cols-1 items-center justify-between lg:gap-16 gap-4 w-full p-2 bg-gray-200 dark:bg-gray-600">
        <div className="lg:col-span-6 col-span-12 shadow-sm">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-3 py-1 rounded w-full text-sm dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="lg:col-span-6 col-span-12 shadow-sm">
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-1 rounded-md w-full dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Posts</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto shadow-md">
        <table className="table table-xs w-full dark:border-gray-700 rounded-md table-pin-rows table-pin-cols">
          <thead className="dark:border-gray-700 bg-gray-200 dark:text-gray-400 font-bold dark:bg-gray-900">
            <tr className="dark:border-gray-700 dark:text-gray-400 font-bold dark:bg-gray-700">
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
                Updated At
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
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center p-4 text-gray-500">
                  No flagged data is available!
                </td>
              </tr>
            ) : (
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
                  <td className="p-2">
                    {new Date(post?.updatedAt).toLocaleString()}
                  </td>
                  <td className="p-2">{post?.reviewStatus}</td>
                  <td className="p-2">
                    {post?.flagCount && (
                      <span className="text-gray-500 relative flex justify-center items-center">
                        <FaFlag className="text-3xl" />
                        <span className="absolute top-[-px] left-[px] right-[] bg-red-500 text-white text-xs rounded-full px-1">
                          {post?.flagCount ? post?.flagCount : "0"}
                        </span>
                      </span>
                    )}
                  </td>
                  <td>
                    {Array.isArray(adminData?.user?.roles) &&
                    adminData.user.roles.some(
                      (role) =>
                        role.name === "super-admin" || role.name === "admin"
                    ) ? (
                      <div className="flex items-center space-x-1 justify-end">
                        <CTAButton
                          onClick={() => openModal(post)}
                          label="View"
                          icon={<FaEye />}
                          className="btn btn-xs text-xs"
                          variant="primary"
                        />
                        {post.reviewStatus !== "pending" ? (
                          <CTAButton
                            onClick={() =>
                              handleResetReviewStatus(post?.flaggedSlug, post)
                            }
                            label={
                              reverting === post?.flaggedSlug
                                ? "Resetting..."
                                : "Reset"
                            }
                            icon={
                              reverting === post?.flaggedSlug ? (
                                <AdminLoader />
                              ) : (
                                <FaRecycle />
                              )
                            }
                            // disabled={post.reviewHistory.length >= 3}
                            className="btn btn-xs text-xs"
                            variant="info"
                          />
                        ) : (
                          ""
                        )}

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
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="py-4">
        <AdminPagination
          items={processedData}
          onPaginatedDataChange={setPaginatedData} // Directly update paginated data
        />
      </div>

      {/* Modal Section */}
      {isOpen && modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-2xl w-full">
            {/* Flagged post header begins */}
            <div className="">
              <div className="h-60">
                <img
                  src={`${apiURL}${modalData?.postId?.image}`}
                  alt={modalData?.postId?.title.slice(0, 20)}
                  className="rounded-md w-full h-60 shadow-md"
                />
              </div>
              <div className="border-b border-gray-300 mb-2 flex items-center justify-between">
                <h1 className="text-2xl font-bold my-2">Flagged Post Review</h1>
              </div>
              <div className="my-2">
                <div className="">
                  <h2 className="text-xl font-bold text-gray-600">
                    {modalData?.postId?.title.slice(0, 50)}...
                  </h2>
                </div>
                <div className="flex justify-end items-center px-2">
                  <CTAButton
                    label="View Post"
                    icon={<FaEye />}
                    className="btn btn-xs text-xs mt-1"
                  />
                </div>
              </div>
            </div>
            {/* Flagged post header ends */}

            <div className="my-2 mt-2 max-h-60 overflow-y-auto p-2 border rounded">
              <div className="bg-gray-100 p-2 rounded-md space-y-3 text-sm">
                {/* Flagged post details begins */}
                <div className="">
                  <div className="font-bold text-gray-900 border-b border-dashed border-gray-300 mb-1 flex items-center text-xl">
                    <FaFlag className="mr-1" />
                    <h2 className="text-xl">Flagged Post Details:</h2>
                  </div>
                  {modalData.flaggedBy.length > 0 ? (
                    modalData?.flaggedBy.map((user) => (
                      <div
                        key={user._id}
                        className="lg:flex flex-1 items-center justify-between"
                      >
                        <span className="font-bold text-gray-900 flex items-center space-x-2">
                          <img
                            src={modalData?.userId?.avatar}
                            alt=""
                            className="w-8 rounded-full"
                          />

                          <span> {user.name}</span>
                        </span>
                        <span>Email: {user.email}</span>
                        <span>
                          {modalData.flaggedAt?.length > 0 && (
                            <span className="flex items-center">
                              <FaClock className="mr-1" />
                              {formatDateTime(modalData.flaggedAt?.[0])}
                            </span>
                          )}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p>No one has flagged this post yet.</p>
                    </div>
                  )}
                </div>
                {/* Flagged post details ends */}

                {/* Flagged post review status history begins */}
                <div className="space-y-2">
                  <div className="font-bold text-gray-900 border-b border-dashed border-gray-300 mb-1 flex items-center text-xl">
                    <FaHistory className="mr-1" />
                    <h2 className="text-xl">Post Review Status History:</h2>
                  </div>

                  <div className="">
                    {modalData?.reviewedBy ? (
                      <div className="lg:flex flex-1 items-center justify-between">
                        <img
                          src={modalData?.userId?.avatar}
                          alt="Moderator"
                          className="w-8 rounded-full"
                        />
                        <span className="font-bold flex items-center">
                          <span className="text-gray-500 font-bold ml-1">
                            {modalData.reviewedBy.name}
                          </span>
                        </span>

                        <span className="flex items-center">
                          <FaEnvelope className="mr-1" />{" "}
                          {modalData.reviewedBy.email}
                        </span>

                        <span className="grid col-span-5">
                          {modalData.reviewedAt.map((data) => (
                            <span key={data._id} className="flex items-center">
                              <FaClock className="mr-1" />{" "}
                              {formatDateTime(data)}
                              <br></br>
                            </span>
                          ))}
                        </span>
                      </div>
                    ) : (
                      <div className="text-yellow-500 font-bold">
                        <p>No admin has reviewed this post yet.</p>
                      </div>
                    )}

                    {/* Review message */}
                    <div className="mt-2">
                      {modalData.reviewStatus === "pending" ? (
                        <span className="text-yellow-500 font-bold">
                          This post is under review.
                        </span>
                      ) : modalData.reviewStatus === "approved" ? (
                        <span className="text-red-500 font-bold">
                          🔴 This flagged post has been approved. Flagging
                          grounded for policy brach.
                        </span>
                      ) : modalData.reviewStatus === "rejected" ? (
                        <span className="text-green-500 font-bold">
                          ✅ This flagged blog post post has been rejected. No
                          policy violation found.
                        </span>
                      ) : (
                        <div className="text-gray-500 font-bold">
                          <p>No review status available.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {modalData?.reviewHistory ? (
                    modalData?.postId?.reviewHistory.map((history) => (
                      <div
                        key={history._id}
                        className="lg:flex items-center justify-between grid lg:grid-cols-2 grid-cols-1"
                      >
                        <span
                          className={`px-2 py-1 rounded-md text-xs shadow-sm uppercase ${
                            modalData?.reviewStatus === "rejected"
                              ? "text-green-600 bg-red-100"
                              : modalData?.reviewStatus === "approved"
                              ? "text-red-700 bg-red-100"
                              : modalData?.reviewStatus === "pending"
                              ? "text-yellow-500 bg-red-400"
                              : "text-gray-500"
                          }`}
                        >
                          {modalData?.reviewStatus}
                        </span>

                        <span className="capitalize">{history?.comment}</span>

                        <span
                          className={`bg-red-600 ml-2 font-semibold ${
                            history?.reviewStatus === "approved"
                              ? "text-red-600"
                              : history?.reviewStatus === "rejected"
                              ? "text-green-600"
                              : history?.reviewStatus === "pending"
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }`}
                        >
                          {history?.reviewStatus}
                        </span>

                        <span className="flex items-center">
                          <FaClock className="mr-1" />
                          {formatDateTime(history.reviewedAt)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p>No data is available at this moment!</p>
                    </div>
                  )}
                </div>
                {/* Flagged post review status history ends */}

                {/* Flagged post status history begins */}
                <div className="grid lg:grid-cols-2 grid-cols-1">
                  {modalData.statusHistory.map((entry, i) => (
                    <div key={i} className="border-b py-2">
                      <p>
                        <strong>Status:</strong> {entry.status}
                      </p>
                      {entry.statusChange && (
                        <p>
                          <strong>Changed:</strong>{" "}
                          {entry.statusChange.oldStatus} →{" "}
                          {entry.statusChange.newStatus}
                        </p>
                      )}
                      <p>
                        <strong>By:</strong> {entry.changedBy.name}
                      </p>
                      <p>
                        <strong>Date:</strong> {formatDateTime(entry.changedAt)}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Flagged post status history ends */}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="btn btn-sm mt-1 hover:bg-red-600 hover:text-gray-200 bg-red-500 text-white rounded flex items-center shadow-md"
              >
                <FaTimes className="mr-1" /> Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlaggedPostsTable;
