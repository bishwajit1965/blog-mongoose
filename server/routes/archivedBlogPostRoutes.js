const express = require("express");
const router = express.Router();

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

const {
  archiveBlog,
  getArchivedBlogBySlug,
  getAllArchivedBlogs,
  restoreArchivedBlog,
  softDeleteArchivedBlog,
} = require("../controllers/archivedBlogPostController");

// ✅ Authenticate all admin routes
router.use(authenticateToken);

// ✅ Archive a blog (PATCH is better than POST for status change)
router.patch(
  "/:slug/archive",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["archive-post"]),
  archiveBlog
);

// ✅ Get a single archived blog by slug
router.get(
  "/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["view-post"]),
  getArchivedBlogBySlug
);

// ✅ Get all archived blog posts (Pagination handled inside)
router.get(
  "/",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["view-post"]),
  getAllArchivedBlogs
);

// ✅ Restore an archived blog (Use `/restore` for clarity)
router.patch(
  "/:slug/restore",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["restore-post"]),
  restoreArchivedBlog
);

// ✅ Soft-Delete an archived blog (No permission check if only super-admin can do this)
router.patch(
  "/:slug/soft-delete",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["soft-delete"]),
  softDeleteArchivedBlog
);

module.exports = router;
