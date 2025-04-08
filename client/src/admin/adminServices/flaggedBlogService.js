import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

// Get a flagged post for review
const getFlaggedPosts = () =>
  handleApiCall(() => api.get(API_PATHS.FLAGGED_BLOGS));

// const reviewFlaggedPost = (slug) =>
//   handleApiCall(() => api.patch(`${API_PATHS.FLAGGED_BLOGS}/review/${slug}`));

// Get a flagged post for review
const getFlaggedBlogBySlug = (slug) =>
  handleApiCall(() => api.get(`${API_PATHS.FLAGGED_BLOGS}/flagged/${slug}`));

// Approve a flagged blog post
const approveFlaggedBlog = (slug) =>
  handleApiCall(() => api.patch(`${API_PATHS.FLAGGED_BLOGS}/approve/${slug}`));

// Reject a flagged blog post
const rejectFlaggedBlog = (slug) =>
  handleApiCall(() => api.patch(`${API_PATHS.FLAGGED_BLOGS}/reject/${slug}`));

// Revert a flagged blog post review status
const revertFlaggedBlogStatus = (slug) =>
  handleApiCall(() =>
    api.patch(`${API_PATHS.FLAGGED_BLOGS}/revert-review-status/${slug}`)
  );

// Undo Rejection of a flagged blog post
const undoRejection = (slug) =>
  handleApiCall(() =>
    api.patch(`${API_PATHS.FLAGGED_BLOGS}/undo-reject/${slug}`)
  );

const permanentlyDeleteFlaggedBlogBySlug = (slug) =>
  handleApiCall(() => api.delete(`${API_PATHS.FLAGGED_BLOGS}/${slug}`));

const banUser = (userId) =>
  handleApiCall(() => api.patch(`${API_PATHS.USERS}/ban/${userId}`));

const unbanUser = (userId) =>
  handleApiCall(() => api.patch(`${API_PATHS.USERS}/unban/${userId}`));

export {
  getFlaggedPosts,
  // reviewFlaggedPost,
  getFlaggedBlogBySlug,
  approveFlaggedBlog,
  rejectFlaggedBlog,
  revertFlaggedBlogStatus,
  undoRejection,
  permanentlyDeleteFlaggedBlogBySlug,
  banUser,
  unbanUser,
};
