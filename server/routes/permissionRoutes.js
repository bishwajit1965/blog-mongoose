const express = require("express");

const {
  createPermission,
  getPermissionById,
  getAllPermissions,
  updatePermission,
  deletePermission,
} = require("../controllers/permissionController");

// To verify if authenticated and if has authorized role(s)
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

const router = express.Router();

// Verify token for all routes those follow
router.use(authenticateToken);

router.post("/", authorizeRoles(["super-admin", "admin"]), createPermission);

router.get(
  "/:id",
  authorizeRoles(["super-admin", "admin", "editor"]),
  getPermissionById
);

router.get(
  "/",
  authorizeRoles(["super-admin", "admin", "editor"]),
  getAllPermissions
);
router.patch(
  "/:id",

  authorizeRoles(["super-admin", "admin"]),
  updatePermission
);

router.delete(
  "/:id",

  authorizeRoles(["admin", "super-admin"]),
  deletePermission
);

module.exports = router;
