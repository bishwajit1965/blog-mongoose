import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

const createBlog = (blog) =>
  handleApiCall(() => api.post(API_PATHS.BLOGS, blog));

const getBlogBySlug = (slug) =>
  handleApiCall(() => api.get(`${API_PATHS.BLOGS}/${slug}`));

const getAllBlogs = () => handleApiCall(() => api.get(API_PATHS.BLOGS));

const updateBlogBySlug = (slug, blog) =>
  handleApiCall(() => api.patch(`${API_PATHS.BLOGS}/${slug}`, blog));

const deleteBlogBySlug = (slug) =>
  handleApiCall(() => api.delete(`${API_PATHS.BLOGS}/${slug}`));

export {
  createBlog,
  getBlogBySlug,
  getAllBlogs,
  updateBlogBySlug,
  deleteBlogBySlug,
};
