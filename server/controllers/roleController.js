const mongoose = require("mongoose");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const User = require("../models/User");

const createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;
    console.log("Request Body:", req.body);
    const role = new Role({ name, description, permissions });
    await role.save();
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in creating t=role", error: error.message });
  }
};

const assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Add role if not already present
    if (!user.roles.includes(roleId)) {
      user.roles.push(roleId);
    }
    await user.save();
    res.status(200).json({ message: "Role assigned successfully!", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error in assigning role!", error });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id).populate("permissions", "name _id");

    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }

    res.status(200).json(role);
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status.json({
      message: "Error in fetching roles",
      error: error.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, permissions } = req.body;

    if (!name)
      return res
        .status(400)
        .json({ status: "error", message: "Role name is required." });

    if (!description)
      return res
        .status(400)
        .json({ status: "error", message: "Description is required." });

    // Validate and convert permissions to ObjectIds
    const permissionIds = permissions
      ? permissions.map((perm) => new mongoose.Types.ObjectId(perm))
      : [];

    // Check if all provided permissions exist
    const existingPermissions = await Permission.find({
      _id: { $in: permissionIds },
    });
    if (existingPermissions.length !== permissions.length) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid permissions provided." });
    }

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name, description, permissions: permissionIds },
      { new: true }
    ).populate("permissions", "name");

    if (!updatedRole) {
      return res
        .status(404)
        .json({ status: "error", message: "Role not found." });
    }
    res.status(200).json({
      status: "success",
      message: "Role updated successfully.",
      data: updatedRole,
    });
  } catch (error) {
    console.error("Error updating role:", error.message);
    res
      .status(400)
      .json({ message: "Error in updating role.", error: error.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndDelete(id);
    if (!role) return res.json(400).json({ message: "Role not found" });
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleting role", error: error.message });
  }
};

module.exports = {
  createRole,
  assignRole,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
};
