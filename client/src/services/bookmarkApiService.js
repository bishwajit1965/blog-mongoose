import API_PATHS from "../admin/adminServices/apiPaths";
import api from "../publicHelperApis/helperApiService";
import handleApiCall from "../admin/adminServices/handleApiCall";
import { getFirebaseAuthHeader } from "../getFirebaseAuthHeader/getFirebaseAuthHeader";

/**=================================================
 *  FRONT END APIS TO ADD, FETCH & DELETE BOOKMARKS
 * =================================================*/
const bookMarkPost = (blogId) =>
  handleApiCall(async () =>
    api.post(
      `${API_PATHS.BOOKMARKED_POSTS}/bookmark/${blogId}`,
      {},
      {
        headers: await getFirebaseAuthHeader(),
      },
    ),
  );

const getAllBookmarkedPost = () =>
  handleApiCall(async () =>
    api.get(`${API_PATHS.BOOKMARKED_POSTS}/get-bookmarks`, {
      headers: await getFirebaseAuthHeader(),
    }),
  );

const removeBookmark = (blogId) =>
  handleApiCall(async () =>
    api.delete(`${API_PATHS.BOOKMARKED_POSTS}/remove-bookmark/${blogId}`, {
      headers: await getFirebaseAuthHeader(),
    }),
  );

export { bookMarkPost, getAllBookmarkedPost, removeBookmark };
