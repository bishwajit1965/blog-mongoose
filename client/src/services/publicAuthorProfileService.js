import API_PATHS from "../admin/adminServices/apiPaths";
import handleApiCall from "../admin/adminServices/handleApiCall";
import api from "./api";

const getAuthorPublicProfile = (authorId) =>
  handleApiCall(() =>
    api.get(`${API_PATHS.PUBLIC_AUTHOR_DATA}/profile/${authorId}`),
  );

const getAuthorBlogCount = (authorId) =>
  handleApiCall(() =>
    api.get(`${API_PATHS.PUBLIC_AUTHOR_DATA}/blogs/${authorId}`),
  );

const getAuthorOnlineStatus = (authorId) =>
  handleApiCall(() =>
    api.get(`${API_PATHS.PUBLIC_AUTHOR_DATA}/is-online/${authorId}`),
  );

const getAuthorLatestPosts = (authorId) =>
  handleApiCall(() =>
    api.get(`${API_PATHS.PUBLIC_AUTHOR_DATA}/latest-posts/${authorId}`),
  );

const getAuthorComingSoonPosts = (authorId) =>
  handleApiCall(() =>
    api.get(`${API_PATHS.PUBLIC_AUTHOR_DATA}/coming-soon/${authorId}`),
  );

const getAuthorFollowers = (authorId) =>
  handleApiCall(() =>
    api.get(`${API_PATHS.PUBLIC_AUTHOR_DATA}/followers/${authorId}`),
  );

export {
  getAuthorPublicProfile,
  getAuthorBlogCount,
  getAuthorOnlineStatus,
  getAuthorLatestPosts,
  getAuthorComingSoonPosts,
  getAuthorFollowers,
};
