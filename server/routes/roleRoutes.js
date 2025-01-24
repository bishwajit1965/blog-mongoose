const express = require("express");

const {
  createRole,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

const { verifyToken, isSuperAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, isSuperAdmin(["admin"]), createRole);
router.get("/:id", verifyToken, isSuperAdmin(["admin", "editor"]), getRoleById);
router.get("/", verifyToken, isSuperAdmin(["admin", "editor"]), getAllRoles);
router.patch("/:id", verifyToken, isSuperAdmin(["admin"]), updateRole);
router.delete(
  "/:id",
  verifyToken,
  isSuperAdmin(["admin", "super-admin"]),
  deleteRole
);

module.exports = router;
