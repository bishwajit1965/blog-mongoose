const express = require("express");
const { loginAdmin, logoutAdmin } = require("../controllers/adminController");
const { verifyAdminRoles } = require("../middlewares/verifyAdminRoles");
const User = require("../models/User");
const { authenticateToken } = require("../middlewares/authenticate");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.use(authenticateToken);

// Admin details route for auth state persistence(is a must)
// router.get("/me", authenticateToken, async (req, res) => {
//   try {
//     // Fetch the user and populate roles with their names
//     const user = await User.findById(req.user.id)
//       .populate("roles", "name") // Populate roles with their names
//       .populate("permissions", "name"); // Populate permissions with their names

//     if (!user) {
//       return res.status(401).json({ message: "User not found." });
//     }
//     // const roles = user.roles;
//     res.status(200).json({ user }); // Send user details back
//   } catch (error) {
//     res.status(401).json({
//       status: "error",
//       message: "Unauthorized: Invalid or expired token.",
//     });
//   }
// });

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

// Super-Admin Only Routes
router.use("/super-admin", verifyAdminRoles(["super-admin"]));

router.get("/super-admin/super-admin-dashboard", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the super-admin dashboard!",
  });
});

// Admin-only routes
router.use("/admin", verifyAdminRoles(["admin", "super-admin"]));

router.get("/admin/admin-home-dashboard", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to the admin dashboard!" });
});

// Editor-only routes
router.use("/editor", verifyAdminRoles(["editor", "admin"]));

router.get("/editor/dashboard", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to editor dashboard!" });
});

// Writer-only routes
router.use("/writer", verifyAdminRoles(["writer", "admin", "super-admin"]));

router.get("/writer/dashboard", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to writer dashboard!" });
});

// Example of a protected admin-only route(Is a must)
router.get(
  "/protected",
  verifyAdminRoles(["admin", "super-admin"]),
  (req, res) => {
    res
      .status(200)
      .json({ status: "success", message: "You have access to this route." });
  }
);

module.exports = router;
