const User = require("../models/User");
const Permission = require("../models/Permission");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const { validateUserInput } = require("../utils/validators");

const createUser = async (req, res) => {
  try {
    const { firebaseUid, name, email, password, avatar } = req.body; // Default role as "user"
    console.log("Request body data:", req.body);

    if (!firebaseUid || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(409)
        .json({ status: "error", message: "User already exists." });
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Fetch default (e.g. ,"user") role from 'roles' collection
    const defaultRole = await Role.findOne({ name: "user" });

    if (!defaultRole) {
      return res.status(500).json({ message: "Default user role not found" });
    }
    const defaultPermission = await Permission.findOne({ name: "read" });

    if (!defaultPermission) {
      return res.status(500).json({
        message: "Default permission not found in the database.",
      });
    }

    // Validate user input
    validateUserInput({
      defaultRole,
      defaultPermission,
    });

    // Create a new user
    const newUser = new User({
      firebaseUid,
      name: name || "Anonymous",
      email,
      password: hashedPassword,
      avatar: avatar || "https://i.ibb.co/MgsDqCZ/FB-IMG-1678691214526.jpg",
      roles: [defaultRole._id],
      permissions: [defaultPermission._id],
    });

    const savedUser = await newUser.save();
    console.log("User saved successfully", savedUser);

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error in creating user:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get user details with roles and permissions populated
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate("roles", "name")
      .populate("permissions", "name");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Update user roles and permissions
const updateUserRolesAndPermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles, permissions } = req.body;

    // Validate roles and permissions
    const validRoles = roles ? await Role.find({ _id: { $in: roles } }) : [];
    const validPermissions = permissions
      ? await Permission.find({ _id: { $in: permissions } })
      : [];

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        roles: validRoles.map((role) => role._id),
        permissions: validPermissions.map((permission) => permission._id),
      },
      { new: true } // Return updated document
    )
      .populate("roles", "name")
      .populate("permissions", "name");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUserRolesAndPermissions,
  deleteUser,
};
