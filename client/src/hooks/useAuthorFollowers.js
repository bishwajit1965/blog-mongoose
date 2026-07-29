import useApiQuery from "./useApiQuery";

export const useAuthorFollowers = (userId, options = {}) => {
  return useApiQuery({
    key: "authorFollowers",
    url: `/follow-users/${userId}/followers`,
    enabled: !!userId,
    ...options,
  });
};

export const useAuthorFollowing = (userId, options = {}) => {
  return useApiQuery({
    key: "authorFollowing",
    url: `/follow-users/${userId}/following`,
    enabled: !!userId,
    ...options,
  });
};
