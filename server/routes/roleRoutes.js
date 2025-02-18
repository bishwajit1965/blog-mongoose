const express = require("express");

const {
  createRole,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

const router = express.Router();

// Checks token for all routes those follow
router.use(authenticateToken);

router.post("/", authorizeRoles(["super-admin", "admin"]), createRole);

router.get(
  "/:id",
  authorizeRoles(["super-admin", "admin", "editor"]),
  getRoleById
);

router.get(
  "/",
  authorizeRoles(["super-admin", "admin", "editor"]),
  getAllRoles
);

router.patch("/:id", authorizeRoles(["super-admin", "admin"]), updateRole);

router.delete("/:id", authorizeRoles(["admin", "super-admin"]), deleteRole);

module.exports = router;
