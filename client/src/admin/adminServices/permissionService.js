import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

const createPermission = (permission) =>
  handleApiCall(() => api.post(API_PATHS.PERMISSIONS, permission));

const getPermissionById = (id) =>
  handleApiCall(() => api.get(`${API_PATHS.PERMISSIONS}/${id}`));

const getAllPermissions = () =>
  handleApiCall(() => api.get(API_PATHS.PERMISSIONS));

const updatePermission = (id, permission) =>
  handleApiCall(() => api.patch(`${API_PATHS.PERMISSIONS}/${id}`, permission));

const deletePermission = (id) =>
  handleApiCall(() => api.delete(`${API_PATHS.PERMISSIONS}/${id}`));

export {
  createPermission,
  getPermissionById,
  getAllPermissions,
  updatePermission,
  deletePermission,
};
