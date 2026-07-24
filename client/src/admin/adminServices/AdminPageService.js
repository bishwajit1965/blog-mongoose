import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

const createPage = (page) =>
  handleApiCall(() => api.post(`${API_PATHS.PAGES}/create`, page));

const getPageBySlug = (slug) =>
  handleApiCall(() => api.get(`${API_PATHS.PAGES}/${slug}`));

const getAllPages = () =>
  handleApiCall(() => api.get(`${API_PATHS.PAGES}/all`));

const updatePage = (id, page) =>
  handleApiCall(() => api.patch(`${API_PATHS.PAGES}/edit/${id}`, page));

const softDeletePage = (id) =>
  handleApiCall(() => api.delete(`${API_PATHS.PAGES}/soft-delete/${id}`));

const getSoftDeletedPages = () =>
  handleApiCall(() => api.get(`${API_PATHS.PAGES}/soft-deleted`));

const hardDeletePage = (id) =>
  handleApiCall(() => api.delete(`${API_PATHS.PAGES}/hard-delete/${id}`));

const restorePage = (id) =>
  handleApiCall(() => api.patch(`${API_PATHS.PAGES}/restore/${id}`));

export {
  createPage,
  getPageBySlug,
  getAllPages,
  updatePage,
  softDeletePage,
  getSoftDeletedPages,
  hardDeletePage,
  restorePage,
};
