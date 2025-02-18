const express = require("express");

const {
  createTag,
  getTagById,
  getAllTags,
  updateTag,
  deleteTag,
} = require("../controllers/tagController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

const router = express.Router();

// Verifies token of all routes those follow
router.use(authenticateToken);

router.post("/", authorizeRoles(["super-admin", "admin"]), createTag);

router.get(
  "/:id",
  authorizeRoles(["super-admin", "admin", "editor"]),
  getTagById
);

router.get("/", authorizeRoles(["super-admin", "admin", "editor"]), getAllTags);

router.patch("/:id", authorizeRoles(["super-admin", "admin"]), updateTag);

router.delete("/:id", authorizeRoles(["super-admin"]), deleteTag);

module.exports = router;
