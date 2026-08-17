const User = require("../models/User");
const Permission = require("../models/Permission");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const { validateUserInput } = require("../utils/validators");
const UserActionAuditLog = require("../models/UserActionAuditLog");
const { generateJWT } = require("../utils/jwt");

// Used for creating user in MongoDB immediately after Firebase signUp
const createUser = async (req, res) => {
  try {
    const { firebaseUid, name, email, password, avatar } = req.body;
    const safeName = typeof name === "string" ? name.trim() : "";

    if (!firebaseUid || !email) {
      console.error("❌ Missing required fields!");
      return res
        .status(400)
        .json({ message: "Firebase UID and Email are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("❌ User already exists!");
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    let hashedPassword = null;
    if (password) {
      console.log("🔐 Hashing password...");
      const saltRounds = 12;
      hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("✅ Password hashed.");
    }

    console.log("🔍 Fetching default role & permissions...");
    const [defaultRole, defaultPermission] = await Promise.all([
      Role.findOne({ name: "user" }),
      Permission.findOne({ name: "read-post" }),
    ]);

    if (!defaultRole || !defaultPermission) {
      console.error("❌ Missing default role or permission.");
      return res.status(500).json({
        message: "Default role/permission not found in the database.",
      });
    }

    // Creating new user instance
    const newUser = new User({
      firebaseUid,
      name: safeName || email.split("@")[0] || "Anonymous",
      email,
      password: hashedPassword,
      avatar: avatar || "https://i.ibb.co/MgsDqCZ/FB-IMG-1678691214526.jpg",
      roles: [defaultRole._id],
      permissions: [defaultPermission._id],
    });

    console.log("💾 Saving user to MongoDB...");
    const savedUser = await newUser.save();

    const token = generateJWT({
      id: savedUser._id,
      email: savedUser.email,
      roles: savedUser.roles,
      permissions: savedUser.permissions,
    });

    console.log("✅ User saved successfully!");

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("❌ Error in creating user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "User ID is required." });

    const user = await User.findById(id)
      .populate("roles", "name")
      .populate("permissions", "name");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return res
      .status(400)
      .json({ message: "Invalid user ID or error fetching user." });
  }
};

const banUser = async (req, res) => {
  const { userId, durationDays, flaggedReason } = req.body;
  try {
    const banUntil = durationDays
      ? new Date(Date.now() + durationDays * 86400000)
      : null;

    const user = await User.findByIdAndUpdate(
      userId,
      { isBanned: true, banExpiresAt: banUntil },
      { new: true },
    );
    // If no user return an error
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await UserActionAuditLog.create({
      action: "user-banned",
      moderatorId: req.user.id,
      affectedUserId: user._id,
      comment: flaggedReason || "No specific reason provided",
      timestamp: new Date(),
    });

    return res
      .status(200)
      .json({ message: "User is banned successfully.", user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ban operation failed", details: error });
  }
};

const unbanUser = async (req, res) => {
  const { userId, flaggedReason } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        isBanned: false,
        banExpiresAt: null,
      },
      {
        new: true,
      },
    );
    if (!user) {
      return res.status(404).json({ message: " User not found." });
    }

    // Log the unban action in the audit log
    await UserActionAuditLog.create({
      action: "user-unbanned",
      moderatorId: req.user.id,
      comment: flaggedReason || "No specific reason provided.",
      timestamp: new Date(),
    });

    return res
      .status(200)
      .json({ message: "User is unbanned successfully.", user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Unban operation failed", details: error });
  }
};

module.exports = {
  createUser,
  getUserById,
  banUser,
  unbanUser,
};
