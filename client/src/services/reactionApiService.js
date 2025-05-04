import API_PATHS from "../admin/adminServices/apiPaths";
import api from "../admin/adminServices/api";
import handleApiCall from "../admin/adminServices/handleApiCall";

const reactToPost = (slug, reaction) =>
  handleApiCall(() =>
    api.post(`${API_PATHS.REACTIONS}/react/${slug}`, reaction)
  );

const getReactionsForPost = (slug) =>
  handleApiCall(() => api.get(`${API_PATHS.REACTIONS}/counts/${slug}`));

export { reactToPost, getReactionsForPost };
