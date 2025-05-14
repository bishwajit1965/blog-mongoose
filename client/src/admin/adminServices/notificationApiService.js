import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

// Admin: Create new notification
const createNotification = (notificationData) =>
  handleApiCall(() =>
    api.post(`${API_PATHS.NOTIFICATIONS}/create`, notificationData)
  );

// Get all notifications (admin-facing)
const getAllNotifications = () =>
  handleApiCall(() => api.get(`${API_PATHS.NOTIFICATIONS}/all`));

// Get all active notifications (user-fetching)
const getActiveNotifications = () =>
  handleApiCall(() => api.get(`${API_PATHS.NOTIFICATIONS}/active`));

// Admin: Toggle a notification's active status
const toggleNotificationActiveStatus = (id) =>
  handleApiCall(() => api.patch(`${API_PATHS.NOTIFICATIONS}/toggle/${id}`));

// Update notification
const updateNotification = (id, updatedData) =>
  handleApiCall(() =>
    api.patch(`${API_PATHS.NOTIFICATIONS}/${id}`, updatedData)
  );

// Publish notice
const publishNotice = (id) =>
  handleApiCall(() => api.patch(`${API_PATHS.NOTIFICATIONS}/publish/${id}`));

// Archive notice
const archiveNotice = (id) =>
  handleApiCall(() => api.patch(`${API_PATHS.NOTIFICATIONS}/archive/${id}`));

// Soft delete notice
const softDeleteNotice = (id) =>
  handleApiCall(() =>
    api.patch(`${API_PATHS.NOTIFICATIONS}/soft-delete/${id}`)
  );

// Delete notice permanently
const permanentDeleteNoticeById = (id) =>
  handleApiCall(() => api.delete(`${API_PATHS.NOTIFICATIONS}/${id}`));

export {
  createNotification,
  getAllNotifications,
  getActiveNotifications,
  toggleNotificationActiveStatus,
  updateNotification,
  publishNotice,
  archiveNotice,
  softDeleteNotice,
  permanentDeleteNoticeById,
};
