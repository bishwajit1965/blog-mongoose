import handleApiCall from "../admin/adminServices/handleApiCall";
import api from "./api";
import PUBLIC_API_PATHS from "./publicApiPaths";

const getAuthorFollowStatus = (authorId) =>
  handleApiCall(() =>
    api.get(
      `${PUBLIC_API_PATHS.PUBLIC_AUTHOR_FOLLOW_STATUS}/follow-status/${authorId}`,
    ),
  );

export { getAuthorFollowStatus };
