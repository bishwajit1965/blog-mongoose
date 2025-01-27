import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

const createUser = (user) =>
  handleApiCall(() => api.post(API_PATHS.USERS, user));

const getUserById = (id) =>
  handleApiCall(() => api.get(`${API_PATHS.USERS}/${id}`));

const getAllUsers = () => handleApiCall(() => api.get(API_PATHS.USERS));

const updateUser = (id, user) =>
  handleApiCall(() => api.patch(`${API_PATHS.USERS}/${id}`, user));

const deleteUser = (id) =>
  handleApiCall(() => api.delete(`${API_PATHS.USERS}/${id}`));

export { createUser, getUserById, getAllUsers, updateUser, deleteUser };
