const UserManagement = require("../models/userManagement");
const Permission = require("../models/Permission");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const result = await User.find()
      .populate("roles") // Populates roles
      .populate("permissions"); // Populates permissions
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const assignRolesAndPermissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roles = [], permissions = [] } = req.body;

    // Validate if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid user ID format" });
    }

    console.log("Roles request for update:", roles);
    console.log("Permissions request for update:", permissions);
    console.log("Request body:", req.body);

    // Fetch existing roles and permissions in parallel
    const [validRoles, validPermissions] = await Promise.all([
      Role.find({ _id: { $in: roles } }),
      Permission.find({ _id: { $in: permissions } }),
    ]);

    // Ensure roles and permissions exist before updating
    if (roles.length && validRoles.length !== roles.length) {
      return res.status(400).json({ message: "One or more roles are invalid" });
    }

    if (permissions.length && validPermissions.length !== permissions.length) {
      return res.status(400).json({
        status: "error",
        message: "One or more permissions are invalid",
      });
    }

    // Check if the user exists before updating
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    // If roles or permissions arrays are empty, reset them to empty arrays
    const updatedRoles = roles.length ? validRoles.map((role) => role._id) : [];
    const updatedPermissions = permissions.length
      ? validPermissions.map((permission) => permission._id)
      : [];

    // Update the user with the new roles and permissions
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        roles: updatedRoles,
        permissions: updatedPermissions,
      },
      { new: true }
    )
      .populate("roles", "name")
      .populate("permissions", "name")
      .lean();

    res.status(200).json({
      status: "success",
      message: "User updated successfully!",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Delete a user (Admin functionality)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the user has permission to delete
    if (!req.user.permissions.includes("delete-post")) {
      return res
        .status(403)
        .json({ status: "error", message: "Permission denied" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getAllUsers,
  assignRolesAndPermissions,
  deleteUser,
};
