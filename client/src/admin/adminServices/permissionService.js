import api from "./api";

const createPermission = async (permission) => {
  try {
    const response = await api.post("/permissions", permission);
    return response.data;
  } catch (error) {
    console.error("Failed to create permission:", error);
    throw error;
  }
};

const getPermissionById = async (id) => {
  try {
    const response = await api.get(`/permissions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch permission by id:", error);
    throw error;
  }
};

const getAllPermissions = async () => {
  try {
    const response = await api.get("/permissions");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch permissions:", error);
    throw error;
  }
};

const updatePermission = async (id, permission) => {
  try {
    const response = await api.patch(`/permissions/${id}`, permission);
    return response.data;
  } catch (error) {
    console.error("Failed to update permission:", error);
    throw error;
  }
};

const deletePermission = async (id) => {
  try {
    const response = await api.delete(`/permissions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete permission:", error);
    throw error; // Optionally handle in the calling component
  }
};

export {
  createPermission,
  getPermissionById,
  getAllPermissions,
  updatePermission,
  deletePermission,
};
