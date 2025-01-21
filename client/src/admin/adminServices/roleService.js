import api from "./api";

const createRole = async (role) => {
  try {
    const response = await api.post("/roles", role);
    return response.data;
  } catch (error) {
    console.error("Failed to create role:", error);
    throw error;
  }
};

const getRoleById = async (id) => {
  try {
    const response = await api.get(`/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to find permission by id:", error);
    throw error;
  }
};

const getAllRoles = async () => {
  try {
    const response = await api.get("/roles");
    return response.data;
  } catch (error) {
    console.error("Failed to retrieve all roles:", error);
    throw error;
  }
};

const updateRole = async (id, role) => {
  try {
    const response = await api.patch(`/roles/${id}`, role);
    return response.data;
  } catch (error) {
    console.error("Failed to update role:", error);
    throw error;
  }
};

const deleteRole = async (id) => {
  try {
    const response = await api.delete(`/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete role:", error);
    throw error;
  }
};

export { createRole, getRoleById, getAllRoles, updateRole, deleteRole };
