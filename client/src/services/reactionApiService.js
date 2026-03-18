import API_PATHS from "../admin/adminServices/apiPaths";
import api from "../admin/adminServices/api";
import handleApiCall from "../admin/adminServices/handleApiCall";
import { getFirebaseAuthHeader } from "../getFirebaseAuthHeader/getFirebaseAuthHeader";

const reactToPost = (slug, reaction) =>
  handleApiCall(async () =>
    api.post(
      `${API_PATHS.REACTIONS}/react/${slug}`,
      reaction,

      {
        headers: await getFirebaseAuthHeader(),
      },
    ),
  );

const getReactionsForPost = (slug) =>
  handleApiCall(async () =>
    api.get(`${API_PATHS.REACTIONS}/counts/${slug}`, {
      headers: await getFirebaseAuthHeader(),
    }),
  );

export { reactToPost, getReactionsForPost };
