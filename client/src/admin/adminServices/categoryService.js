import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

const createCategory = (category) =>
  handleApiCall(() => api.post(API_PATHS.CATEGORIES, category));

const getCategoryById = (id) =>
  handleApiCall(() => api.get(`${API_PATHS.CATEGORIES}/${id}`));

const getAllCategories = () =>
  handleApiCall(() => api.get(API_PATHS.CATEGORIES));

const updateCategory = (id, category) =>
  handleApiCall(() => api.patch(`${API_PATHS.CATEGORIES}/${id}`, category));

const deleteCategory = (id) =>
  handleApiCall(() => api.delete(`${API_PATHS.CATEGORIES}/${id}`));

export {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
