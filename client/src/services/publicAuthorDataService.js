import API_PATHS from "../admin/adminServices/apiPaths";
import handleApiCall from "../admin/adminServices/handleApiCall";
import api from "./api";

const getPublicAuthorData = () =>
  handleApiCall(() => api.get(`${API_PATHS.PUBLIC_AUTHOR_DATA}/author-data`));

export { getPublicAuthorData };
