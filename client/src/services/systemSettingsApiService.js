import handleApiCall from "../admin/adminServices/handleApiCall";
import API_PATHS from "../admin/adminServices/apiPaths";
import api from "../admin/adminServices/api";

const getSystemSettings = () =>
  handleApiCall(() => api.get(API_PATHS.SETTINGS));

const getPublicSystemSettings = () =>
  handleApiCall(() => api.get(`${API_PATHS.SETTINGS}/public`));

const updateSystemSettings = (settings) =>
  handleApiCall(() => api.put(`${API_PATHS.SETTINGS}/edit`, settings));

const uploadSystemSettingsImage = (imageType, file) => {
  const formData = new FormData();
  formData.append("image", file);
  return handleApiCall(() =>
    api.patch(`${API_PATHS.SETTINGS}/images/${imageType}`, formData),
  );
};

export {
  getSystemSettings,
  getPublicSystemSettings,
  updateSystemSettings,
  uploadSystemSettingsImage,
};
