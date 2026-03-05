import API_PATHS from "./apiPaths";
import api from "./api";
import handleApiCall from "./handleApiCall";

// Send a new message
const createContact = (message) =>
  handleApiCall(() => api.post(API_PATHS.CONTACT, message));

// Get logged-in user's messages
const getMyContacts = () =>
  handleApiCall(() => api.get(`${API_PATHS.CONTACT}/my`));

// Admin / Super Admin only
const getAllContacts = () => handleApiCall(() => api.get(API_PATHS.CONTACT));

const updateContactStatus = (id, status) =>
  handleApiCall(() => api.patch(`${API_PATHS.CONTACT}/${id}`, { status }));

const deleteContact = (id) =>
  handleApiCall(() => api.delete(`${API_PATHS.CONTACT}/${id}`));

export {
  createContact,
  getMyContacts,
  getAllContacts,
  updateContactStatus,
  deleteContact,
};
