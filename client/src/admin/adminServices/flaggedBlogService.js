import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

// Get a flagged post for review
const getFlaggedPosts = () =>
  handleApiCall(() => api.get(API_PATHS.FLAGGED_BLOGS));

// Get a flagged post for review
const getFlaggedBlogBySlug = (slug) =>
  handleApiCall(() => api.get(`${API_PATHS.FLAGGED_BLOGS}/flagged/${slug}`));

// Approve a flagged blog post
const approveFlaggedBlog = (slug, reviewComment) =>
  handleApiCall(() =>
    api.patch(`${API_PATHS.FLAGGED_BLOGS}/approve/${slug}`, {
      reviewComment,
    })
  );

// Reject a flagged blog post
const rejectFlaggedBlog = (slug, reviewComment) =>
  handleApiCall(() =>
    api.patch(`${API_PATHS.FLAGGED_BLOGS}/reject/${slug}`, {
      reviewComment,
    })
  );

// Revert a flagged blog post review status
const revertFlaggedBlogStatus = (slug) =>
  handleApiCall(() =>
    api.patch(`${API_PATHS.FLAGGED_BLOGS}/revert-review-status/${slug}`)
  );

// Add or update a moderator note
const addModeratorNote = (slug, note) =>
  handleApiCall(() =>
    api.patch(`${API_PATHS.FLAGGED_BLOGS}/${slug}/moderator-note`, { note })
  );

// Change review status manually
const changeReviewStatus = (slug, newStatus, reviewComment) =>
  handleApiCall(() =>
    api.patch(`${API_PATHS.FLAGGED_BLOGS}/${slug}/review-status`, {
      newStatus,
      reviewComment,
    })
  );

// Get analytics data
const getFlaggedPostAnalytics = () =>
  handleApiCall(() => api.get(`${API_PATHS.FLAGGED_BLOGS}/analytics`));

const permanentlyDeleteFlaggedBlogBySlug = (slug) =>
  handleApiCall(() => api.delete(`${API_PATHS.FLAGGED_BLOGS}/${slug}`));

export {
  getFlaggedPosts,
  getFlaggedBlogBySlug,
  approveFlaggedBlog,
  rejectFlaggedBlog,
  revertFlaggedBlogStatus,
  addModeratorNote,
  changeReviewStatus,
  getFlaggedPostAnalytics,
  permanentlyDeleteFlaggedBlogBySlug,
};
