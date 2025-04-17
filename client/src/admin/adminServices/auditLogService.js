import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

// Fetch all audit logs
const getAllAuditLogs = () =>
  handleApiCall(() => api.get(API_PATHS.AUDIT_LOGS));

// Fetch audit logs for a specific post
const getAuditLogsByPostId = (postId) =>
  handleApiCall(() => api.get(`${API_PATHS.AUDIT_LOGS}/post/${postId}`));

// Fetch audit logs for a specific moderator
const getAuditLogsByModeratorId = (moderatorId) =>
  handleApiCall(() =>
    api.get(`${API_PATHS.AUDIT_LOGS}/moderator/${moderatorId}`)
  );

// Create a new audit log entry
const createAuditLogEntry = (logData) =>
  handleApiCall(() => api.post(API_PATHS.AUDIT_LOGS, logData));

export {
  getAllAuditLogs,
  getAuditLogsByPostId,
  getAuditLogsByModeratorId,
  createAuditLogEntry,
};
