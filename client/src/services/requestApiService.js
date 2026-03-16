import API_PATHS from "../admin/adminServices/apiPaths";
import api from "../publicHelperApis/helperApiService";
import handleApiCall from "../admin/adminServices/handleApiCall";

const createRequest = (request) =>
  handleApiCall(() => api.post(`${API_PATHS.REQUESTS}/message`, request));

export { createRequest };
