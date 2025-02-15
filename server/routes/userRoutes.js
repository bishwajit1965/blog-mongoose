const express = require("express");
const User = require("../models/User");

const {
  createUser,
  updateUserRolesAndPermissions,
  deleteUser,
} = require("../controllers/userController");

const { verifyToken } = require("../middlewares/authMiddleware");
const { authenticateToken } = require("../middlewares/authenticate");

const router = express.Router();

// Route for user data insertion
router.post("/auth/register", createUser);

router.get("/me", authenticateToken, async (req, res) => {
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

    // Extract role names
    // const roles = user.roles.map((role) => role.name);

    // Extract role IDs directly from the user document
    const roles = user.roles.map((role) => role._id.toString());

    // Extract effective permissions as IDs:
    // Direct permissions (if any) plus permissions from roles
    const directPermissionIds = user.permissions.map((perm) =>
      perm._id.toString()
    );
    const rolePermissionIds = user.roles.flatMap((role) =>
      role.permissions.map((perm) => perm._id.toString())
    );
    const allPermissionIds = [
      ...new Set([...directPermissionIds, ...rolePermissionIds]),
    ];

    // Extract unique permissions from both user and role-based permissions
    // const permissions = [
    //   ...new Set([
    //     ...user.permissions.map((p) => p.name), // Direct user permissions
    //     ...user.roles.flatMap((role) => role.permissions.map((p) => p.name)), // Role-based permissions
    //   ]),
    // ];

    res.status(200).json({ user, roles, allPermissionIds }); // Send roles & permissions separately
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(401).json({
      status: "error",
      message: "Unauthorized: Invalid or expired token.",
    });
  }
});

router.patch(
  "/:id/roles-permissions",
  authenticateToken,
  updateUserRolesAndPermissions
);

router.delete("/:id", authenticateToken, deleteUser);
authenticateToken;
module.exports = router;
