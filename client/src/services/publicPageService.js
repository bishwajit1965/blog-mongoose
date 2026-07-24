import handleApiCall from "../admin/adminServices/handleApiCall";
import api from "./api";
import PUBLIC_API_PATHS from "./publicApiPaths";

const getPublicPageBySlug = (slug) =>
  handleApiCall(() => api.get(`${PUBLIC_API_PATHS.PUBLIC_PAGES}/${slug}`));

export { getPublicPageBySlug };
