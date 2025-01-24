import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

const createRole = (role) =>
  handleApiCall(() => api.post(API_PATHS.ROLES, role));

const getRoleById = (id) =>
  handleApiCall(() => api.get(`${API_PATHS.ROLES}/${id}`));

const getAllRoles = () => handleApiCall(() => api.get(API_PATHS.ROLES));

const updateRole = (id, role) =>
  handleApiCall(() => api.patch(`${API_PATHS.ROLES}/${id}`, role));

const deleteRole = (id) =>
  handleApiCall(() => api.delete(`${API_PATHS.ROLES}/${id}`));

export { createRole, getRoleById, getAllRoles, updateRole, deleteRole };
