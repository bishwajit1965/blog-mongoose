const express = require("express");

const {
  createRole,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

// To verify if authenticated and if isSuperAdmin
const { verifyToken, isSuperAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken, isSuperAdmin);

// Routes
router.post("/", createRole);
router.get("/:id", getRoleById); // Get role by ID
router.get("/", getAllRoles);
router.patch("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
