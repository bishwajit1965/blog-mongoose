import api from "../admin/adminServices/api";
import API_PATHS from "../admin/adminServices/apiPaths";
import handleApiCall from "../admin/adminServices/handleApiCall";

const getAllMongoUsers = () =>
  handleApiCall(() => api.get(API_PATHS.PUBLIC_USERS));

export { getAllMongoUsers };
