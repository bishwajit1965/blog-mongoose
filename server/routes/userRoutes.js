const express = require("express");
const User = require("../models/User");

const { createUser } = require("../controllers/userController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

const router = express.Router();

// Route for user data insertion
router.post("/register", createUser);

// Verifies token of all routes those
router.use(authenticateToken);

router.get("/me", async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "roles",
        select: "name permissions",
        populate: { path: "permissions", select: "name" }, // Populate permissions inside roles
      })
      .populate("permissions", "name"); // Populate direct user permissions (if any)

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // Extract role IDs directly from the user document
    const roles = user.roles
      ? user.roles.map((role) => role._id.toString())
      : [];

    // Extract effective permissions as IDs:
    // Direct permissions (if any) plus permissions from roles
    const directPermissionIds = user.permissions?.map(
      (perm) => perm._id.toString() || []
    );
    const rolePermissionIds = user.roles?.flatMap(
      (role) => role.permissions.map((perm) => perm._id.toString()) || []
    );
    const allPermissionIds = [
      ...new Set([...directPermissionIds, ...rolePermissionIds]),
    ];

    res.status(200).json({ user, roles, allPermissionIds }); // Send roles & permissions separately
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(401).json({
      status: "error",
      message: "Unauthorized: Invalid or expired token.",
    });
  }
});

//NOTE:  UPDATE USER IS MANAGED BY userManagementController.js

//NOTE:  DELETE USER IS MANAGED BY userManagementController.js

module.exports = router;
