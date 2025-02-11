const express = require("express");

const {
  createPermission,
  getPermissionById,
  getAllPermissions,
  updatePermission,
  deletePermission,
} = require("../controllers/permissionController");

// To verify if authenticated and if isSuperAdmin
const { verifyToken, isSuperAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  isSuperAdmin(["super-admin", "admin"]),
  createPermission
);
router.get(
  "/:id",
  verifyToken,
  isSuperAdmin(["super-admin", "admin", "editor"]),
  getPermissionById
);
router.get(
  "/",
  verifyToken,
  isSuperAdmin(["super-admin", "admin", "editor"]),
  getAllPermissions
);
router.patch(
  "/:id",
  verifyToken,
  isSuperAdmin(["super-admin", "admin"]),
  updatePermission
);
router.delete(
  "/:id",
  verifyToken,
  isSuperAdmin(["admin", "super-admin"]),
  deletePermission
);

module.exports = router;
