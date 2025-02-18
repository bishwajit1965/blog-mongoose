const express = require("express");
const router = express.Router();
const User = require("../models/User");

const {
  createUser,
  getAllUsers,
  assignRolesAndPermissions,
  deleteUser,
} = require("../controllers/userManagementController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

// Authenticate all routes those follow it
router.use(authenticateToken);

/** FOR FETCHING AUTHENTICATED USER'S DATA
 * ================================================
 * 1. This endpoint fetches the current authenticated user's data.
 * 2. It populates roles and their permissions and also
 * 3. Returns roles and permissions as separate arrays (IDs).
 * 4. includes any direct user-specific permissions.
 */

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

    res.status(200).json({ user, roles, allPermissionIds }); // Send roles & permissions separately
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(401).json({
      status: "error",
      message: "Unauthorized: Invalid or expired token.",
    });
  }
});

// Super-Admin Only Route
router.post("/", authorizeRoles(["super-admin"]), createUser);

router.get("/", authorizeRoles(["super-admin"]), getAllUsers);

router.patch(
  "/:userId/assign",
  authorizeRoles(["super-admin"]),
  assignRolesAndPermissions
);

router.delete("/:id", authorizeRoles(["super-admin"]), deleteUser);

module.exports = router;
