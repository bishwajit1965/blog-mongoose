import API_PATHS from "../admin/adminServices/apiPaths";
import api from "../helperApiService/helperApiService";
import handleApiCall from "../admin/adminServices/handleApiCall";

/**=================================================
 *  FRONT END APIS TO ADD, FETCH & DELETE BOOKMARKS
 * =================================================*/
const bookMarkPost = (blogId) =>
  handleApiCall(() =>
    api.post(`${API_PATHS.BOOKMARKED_POSTS}/bookmark/${blogId}`)
  );

const getAllBookmarkedPost = () =>
  handleApiCall(() => api.get(`${API_PATHS.BOOKMARKED_POSTS}/get-bookmarks`));

const removeBookmark = (blogId) =>
  handleApiCall(() =>
    api.delete(`${API_PATHS.BOOKMARKED_POSTS}/remove-bookmark/${blogId}`)
  );

export { bookMarkPost, getAllBookmarkedPost, removeBookmark };
