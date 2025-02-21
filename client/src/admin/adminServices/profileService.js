import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

const getAllProfiles = () => handleApiCall(() => api.get(API_PATHS.PROFILE));

const getProfileById = (id) =>
  handleApiCall(() => api.get(`${API_PATHS.PROFILE}/${id}`));

const updateProfile = (id, profile) =>
  handleApiCall(() => api.patch(`${API_PATHS.PROFILE}/${id}`, profile));

export { getAllProfiles, getProfileById, updateProfile };
