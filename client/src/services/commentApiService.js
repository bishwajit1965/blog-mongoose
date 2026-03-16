import API_PATHS from "../admin/adminServices/apiPaths";
import api from "../admin/adminServices/api";
import handleApiCall from "../admin/adminServices/handleApiCall";
import { getFirebaseAuthHeader } from "../getFirebaseAuthHeader/getFirebaseAuthHeader";

/**=======================================================
 *  FRONT END APIS TO ADD, FETCH, UPDATE & DELETE COMMENTS
 * =======================================================*/
const addComment = (slug, comment) =>
  handleApiCall(async () =>
    api.post(`${API_PATHS.COMMENTS}/comment/${slug}`, comment, {
      headers: await getFirebaseAuthHeader(),
    }),
  );

const getComments = (slug) =>
  handleApiCall(async () => api.get(`${API_PATHS.COMMENTS}/counts/${slug}`));

const updateComment = (id, comment) =>
  handleApiCall(async () =>
    api.patch(`${API_PATHS.COMMENTS}/edit-comment/${id}`, comment, {
      headers: await getFirebaseAuthHeader(),
    }),
  );

const deleteComment = (id) =>
  handleApiCall(async () =>
    api.delete(`${API_PATHS.COMMENTS}/delete-comment/${id}`, {
      headers: await getFirebaseAuthHeader(),
    }),
  );

export { addComment, getComments, updateComment, deleteComment };
