const Permission = require("../models/Permission");

const createPermission = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "Valid permission name is required." });
    }
    const newPermission = new Permission({ name, description });
    const savedPermission = await newPermission.save();

    res.status(201).json({
      status: "success",
      message: "Permission created successfully.",
      permission: savedPermission,
    });
  } catch (error) {
    console.error("Error in createPermission:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create permission.",
      error: error.message,
    });
  }
};

const getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findById(id);

    if (!permission) {
      return res
        .status(404)
        .json({ status: "error", message: "Permission not found." });
    }
    res.status(200).json(permission);
  } catch (error) {
    console.error("Error in getPermissionById:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error in fetching permission.",
      error: error.message,
    });
  }
};

const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    console.error("Error in getAllPermissions:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error in fetching permissions.",
    });
  }
};

const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        status: "error",
        message: "Valid permission name is required.",
      });
    }
    const updatedPermission = await Permission.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedPermission) {
      return res
        .status(404)
        .json({ status: "error", message: "Permission not found." });
    }
    res.status(200).json({
      status: "success",
      message: "Permission update is successful.",
      permission: updatedPermission,
    });
  } catch (error) {
    console.error("Error in updatePermission:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error in updating permission.",
      error: error.message,
    });
  }
};

const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPermission = await Permission.findByIdAndDelete(id);
    if (!deletedPermission) {
      return res
        .status(404)
        .json({ status: "error", message: "Permission not found." });
    }
    res.status(200).json({
      status: "success",
      message: "Permission deleted successfully. ",
    });
  } catch (error) {
    console.error("Error in deletePermission:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error in deleting permissions,",
    });
  }
};

module.exports = {
  createPermission,
  getPermissionById,
  getAllPermissions,
  updatePermission,
  deletePermission,
};
