const express = require("express");

const {
  createTag,
  getTagById,
  getAllTags,
  updateTag,
  deleteTag,
} = require("../controllers/tagController");

const { verifyToken, isSuperAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  isSuperAdmin(["super-admin", "admin"]),
  createTag
);
router.get(
  "/:id",
  verifyToken,
  isSuperAdmin(["super-admin", "admin", "editor"]),
  getTagById
);
router.get(
  "/",
  verifyToken,
  isSuperAdmin(["super-admin", "admin", "editor"]),
  getAllTags
);
router.patch(
  "/:id",
  verifyToken,
  isSuperAdmin(["super-admin", "admin"]),
  updateTag
);
router.delete("/:id", verifyToken, isSuperAdmin(["super-admin"]), deleteTag);

module.exports = router;
