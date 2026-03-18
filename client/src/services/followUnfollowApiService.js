import api from "../admin/adminServices/api";
import handleApiCall from "../admin/adminServices/handleApiCall";
import { getFirebaseAuthHeader } from "../getFirebaseAuthHeader/getFirebaseAuthHeader";

const followUser = (authorId) =>
  handleApiCall(async () =>
    api.put(
      `/follow/${authorId}/follow`,
      {},
      {
        headers: await getFirebaseAuthHeader(),
      },
    ),
  );

const unfollowUser = (authorId) =>
  handleApiCall(async () =>
    api.delete(`/follow/${authorId}/unfollow`, {
      headers: await getFirebaseAuthHeader(),
    }),
  );

export { followUser, unfollowUser };
