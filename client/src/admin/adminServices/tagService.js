import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

const createTag = (tag) => handleApiCall(() => api.post(API_PATHS.TAGS, tag));

const getTagById = (id) =>
  handleApiCall(() => api.get(`${API_PATHS.TAGS}/${id}`));

const getAllTags = () => handleApiCall(() => api.get(API_PATHS.TAGS));

const updateTag = (id, tag) =>
  handleApiCall(() => api.patch(`${API_PATHS.TAGS}/${id}`, tag));

const deleteTag = (id) =>
  handleApiCall(() => api.delete(`${API_PATHS.TAGS}/${id}`));

export { createTag, getTagById, getAllTags, updateTag, deleteTag };
