import API_PATHS from "../../admin/adminServices/apiPaths";
import api from "../../admin/adminServices/api";
import handleApiCall from "../../admin/adminServices/handleApiCall";

/**=======================================================
 *  BACK END APIS TO FETCH, APPROVE & REJECT COMMENTS
 * =======================================================*/
const getAllCommentsForAdmin = (id) =>
  handleApiCall(() =>
    api.get(`${API_PATHS.COMMENTS_ADMIN}/admin/get-comments/${id}`)
  );

const approveComment = (id, comment) =>
  handleApiCall(() =>
    api.patch(
      `${API_PATHS.COMMENTS_ADMIN}/admin/approve-comment/${id}`,
      comment
    )
  );

const rejectComment = (id, comment) =>
  handleApiCall(() =>
    api.patch(`${API_PATHS.COMMENTS_ADMIN}/admin/reject-comment/${id}`, comment)
  );

const deleteCommentByAdmin = (id) =>
  handleApiCall(() =>
    api.delete(`${API_PATHS.COMMENTS_ADMIN}/admin/delete-comment/${id}`)
  );

export {
  getAllCommentsForAdmin,
  approveComment,
  rejectComment,
  deleteCommentByAdmin,
};
