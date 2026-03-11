import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

const createBlog = (blog) =>
  handleApiCall(() => api.post(API_PATHS.BLOGS, blog));

const getBlogBySlug = (slug) =>
  handleApiCall(() => api.get(`${API_PATHS.BLOGS}/${slug}`));

const getFlaggingHistory = (slug) =>
  handleApiCall(() => api.get(`${API_PATHS.BLOGS}/flag-history/${slug}`));

const getAllBlogs = () => handleApiCall(() => api.get(API_PATHS.BLOGS));

// Get all types of blog posts for super-admin
const getBlogsForSuperAdminDashBoard = () =>
  handleApiCall(() => api.get(`${API_PATHS.BLOGS}/super-admin`));

const getPopularPosts = () =>
  handleApiCall(() => api.get(`${API_PATHS.BLOGS}/popular`));

const getRelatedBlogPosts = (slug) =>
  handleApiCall(() => api.get(`${API_PATHS.BLOGS}/related-posts/${slug}`));

const updateBlogBySlug = (slug, blog) =>
  handleApiCall(() => api.patch(`${API_PATHS.BLOGS}/${slug}`, blog));

// Soft delete a blog post
const softDeletePost = (slug) =>
  handleApiCall(() => api.patch(`${API_PATHS.BLOGS}/soft-delete/${slug}`));

// Restore a soft deleted blog post
const restoreSoftDeletedPost = (slug) =>
  handleApiCall(() => api.patch(`${API_PATHS.BLOGS}/restore/${slug}`));

const flagPost = (slug) =>
  handleApiCall(() => api.patch(`${API_PATHS.BLOGS}/flag/${slug}`));

const permanentDeleteBlogBySlug = (slug) =>
  handleApiCall(() => api.delete(`${API_PATHS.BLOGS}/${slug}`));

export {
  createBlog,
  getBlogBySlug,
  getFlaggingHistory,
  getAllBlogs,
  getBlogsForSuperAdminDashBoard,
  getPopularPosts,
  getRelatedBlogPosts,
  updateBlogBySlug,
  softDeletePost,
  restoreSoftDeletedPost,
  flagPost,
  permanentDeleteBlogBySlug,
};
