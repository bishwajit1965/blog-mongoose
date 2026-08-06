import API_PATHS from "../admin/adminServices/apiPaths";
import handleApiCall from "../admin/adminServices/handleApiCall";
import api from "./api";

const getPublicSystemSettings = () =>
  handleApiCall(() => api.get(`${API_PATHS.SYSTEM_SETTINGS}/public`));

export { getPublicSystemSettings };
