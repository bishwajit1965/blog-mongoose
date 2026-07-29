import api from "./api";
import API_PATHS from "./apiPaths";
import handleApiCall from "./handleApiCall";

const getAllFollowers = (userId) =>
  handleApiCall(() =>
    api.get(`${API_PATHS.FOLLOW_UNFOLLOW_USERS}/user/${userId}/followers`),
  );

const getAllFollowing = (userId) =>
  handleApiCall(() =>
    api.get(`${API_PATHS.FOLLOW_UNFOLLOW_USERS}/user/${userId}/following`),
  );

export { getAllFollowers, getAllFollowing };
