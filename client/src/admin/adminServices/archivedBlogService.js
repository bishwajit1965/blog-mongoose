import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

// Archive a blog post
const archiveBlog = (slug) =>
  handleApiCall(() => api.patch(`${API_PATHS.ARCHIVED}/${slug}/archive`));

// Restore an archived blog post
const restoreArchivedBlog = (slug) =>
  handleApiCall(() => api.patch(`${API_PATHS.ARCHIVED}/${slug}/restore`));

// Get all archived blogs
const getArchivedBlogs = () => handleApiCall(() => api.get(API_PATHS.ARCHIVED));

// Permanently delete an archived blog
const softDeleteArchivedBlog = (slug) =>
  handleApiCall(() => api.patch(`${API_PATHS.ARCHIVED}/${slug}/soft-delete`));

export {
  archiveBlog,
  restoreArchivedBlog,
  getArchivedBlogs,
  softDeleteArchivedBlog,
};
