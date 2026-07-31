import api from "../admin/adminServices/api";
import handleApiCall from "../admin/adminServices/handleApiCall";
import PUBLIC_API_PATHS from "./publicApiPaths";
import waitForAuth from "../utils/waitForAuth";

const getAuthorFollowStatus = (authorId) =>
  handleApiCall(async () => {
    const currentUser = await waitForAuth();

    const token = currentUser ? await currentUser.getIdToken() : null;

    return api.get(
      `${PUBLIC_API_PATHS.PUBLIC_AUTHOR_FOLLOW_STATUS}/follow-status/${authorId}`,
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      },
    );
  });

export { getAuthorFollowStatus };
