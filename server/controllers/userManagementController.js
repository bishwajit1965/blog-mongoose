const UserManagement = require("../models/userManagement");
const Permission = require("../models/Permission");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Create a new user (Admin functionality)
const createUser = async (req, res) => {
  try {
    const {
      firebaseUid,
      name,
      email,
      password,
      avatar,
      roles = ["viewer"],
      permissions = ["read"],
    } = req.body; // Default role as "viewer"

    // Check if the user has permission to create users
    if (!req.user.permissions.includes("create")) {
      return res.status(403).json({ message: "Permission denied" });
    }

    if (!firebaseUid || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the email already exists
    const emailExists = await UserManagement.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new UserManagement({
      firebaseUid,
      name,
      email,
      password: hashedPassword,
      avatar,
      roles,
      permissions,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

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
    const { roles, permissions } = req.body;

    // Check if user has the necessary permission
    if (!req.user.roles.includes("assign-roles")) {
      return res.status(403).json({ message: "Assigning-role denied" });
    }

    if (!req.user.permissions.includes("assign-permissions.")) {
      return res.status(403).json({ message: "Assigning-permission denied." });
    }

    const user = await UserManagement.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add roles and permissions using $addToSet to avoid duplicates
    if (roles) {
      const validRoles = await Role.find({ _id: { $in: roles } });
      if (validRoles.length !== roles.length) {
        return res.status(400).json({ message: "Invalid roles provided." });
      }
      user.roles = [...new Set([...user.roles, ...roles])]; // Using Set to prevent duplicates
    }

    if (permissions) {
      const validPermissions = await Permission.find({
        _id: { $in: permissions },
      });
      if (validPermissions.length !== permissions.length) {
        return res
          .status(400)
          .json({ message: "Invalid permissions provided." });
      }
      user.permissions = [...new Set([...user.permissions, ...permissions])]; // Using Set to prevent duplicates
    }

    const updatedUser = await user.save();
    return res.status(200).json({
      message: "Roles and permissions assigned successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error assigning roles and permissions:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a user (Admin functionality)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the user has permission to delete
    if (!req.user.permissions.includes("delete")) {
      return res.status(403).json({ message: "Permission denied" });
    }

    const deletedUser = await UserManagement.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
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
  createUser,
  getAllUsers,
  assignRolesAndPermissions,
  deleteUser,
};
