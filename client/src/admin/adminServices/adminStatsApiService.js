import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

const fetchUserStats = async (queryParams) =>
  handleApiCall(() => api.get(API_PATHS.USER_STATS, { params: queryParams }));

const fetchRecentUsers = async (queryParams) =>
  handleApiCall(() => api.get(API_PATHS.RECENT_USERS, { params: queryParams }));

export { fetchUserStats, fetchRecentUsers };
