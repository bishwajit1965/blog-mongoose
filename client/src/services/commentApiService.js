import API_PATHS from "../admin/adminServices/apiPaths";
import api from "../admin/adminServices/api";
import handleApiCall from "../admin/adminServices/handleApiCall";

/**=======================================================
 *  FRONT END APIS TO ADD, FETCH, UPDATE & DELETE COMMENTS
 * =======================================================*/
const addComment = (slug, comment) =>
  handleApiCall(() =>
    api.post(`${API_PATHS.COMMENTS}/comment/${slug}`, comment)
  );

const getComments = (slug) =>
  handleApiCall(() => api.get(`${API_PATHS.COMMENTS}/counts/${slug}`));

const updateComment = (id, comment) =>
  handleApiCall(() =>
    api.patch(`${API_PATHS.COMMENTS}/edit-comment/${id}`, comment)
  );

const deleteComment = (id) =>
  handleApiCall(() => api.delete(`${API_PATHS.COMMENTS}/delete-comment/${id}`));

export { addComment, getComments, updateComment, deleteComment };
