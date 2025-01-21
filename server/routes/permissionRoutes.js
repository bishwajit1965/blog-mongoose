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

// Apply middleware to all routes
router.use(verifyToken, isSuperAdmin);

router.post("/", createPermission);
router.get("/:id", getPermissionById);
router.get("/", getAllPermissions);
router.patch("/:id", updatePermission);
router.delete("/:id", deletePermission);

module.exports = router;
