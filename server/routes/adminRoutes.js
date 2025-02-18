const express = require("express");
const {
  loginAdmin,
  // updateAdminUserRolesAndPermissions,
  logoutAdmin,
  // deleteUser,
} = require("../controllers/adminController");

const User = require("../models/User");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

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

// Super-Admin Only Routes
router.use("/super-admin", authorizeRoles(["super-admin"]));

router.get("/super-admin/super-admin-dashboard", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the super-admin dashboard!",
  });
});

// router.patch(
//   "/admin/users/:userId/assign",
//   authorizeRoles(["super-admin"]),
//   updateAdminUserRolesAndPermissions
// );

// router.delete("/:id", authenticateToken, deleteUser);

// Admin-only routes
router.use("/admin", authorizeRoles(["admin", "super-admin"]));

router.get("/admin/admin-home-dashboard", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to the admin dashboard!" });
});

// Editor-only routes
router.use("/editor", authorizeRoles(["editor", "admin"]));

router.get("/editor/dashboard", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to editor dashboard!" });
});

// Writer-only routes
router.use("/writer", authorizeRoles(["writer", "admin", "super-admin"]));

router.get("/writer/dashboard", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to writer dashboard!" });
});

// Example of a protected admin-only route(Is a must)
router.get(
  "/protected",
  authorizeRoles(["admin", "super-admin"]),
  (req, res) => {
    res
      .status(200)
      .json({ status: "success", message: "You have access to this route." });
  }
);

module.exports = router;
