const express = require("express");
const upload = require("../middlewares/upload");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlogBySlug,
  softDeletePost,
  restoreSoftDeletedPost,
  getAllNonDeletedBlogs,
  flagPost,
  getFlaggingHistory,
  deleteBlogBySlug,
} = require("../controllers/blogController");

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

// Public routes - No authentication required
router.get("/", getAllBlogs); // View all blogs
router.get("/:slug", getBlogBySlug); // View single blog by slug

// Authenticate all admin routes routes those follow it
router.use(authenticateToken);

router.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/sitemap.xml"));
});

// Public flagging history route - No authentication required
router.patch("/flag/:slug", flagPost); // Flag a blog post

// Create a new blog post
router.post(
  "/",
  authorizeRoles(["super-admin", "editor", "writer"]),
  authorizePermissions(["create-post"]),
  upload.single("image"),
  createBlog
);

// Fetch a single blog post by slug
router.get(
  "/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["view-post"]),
  getBlogBySlug
);

// Fetch flagging history
router.get(
  "/flag-history/:slug",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["view-post"]),
  getFlaggingHistory
);

// Fetch all non-deleted blog posts
router.get(
  "/",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["view-post"]),
  getAllNonDeletedBlogs
);

// Restore a soft deleted blog post
router.patch(
  "/restore/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["restore-post"]),
  restoreSoftDeletedPost
);

// Update a blog post
router.patch(
  "/:slug",
  authorizeRoles(["super-admin", "admin", "editor", "writer"]),
  authorizePermissions(["edit-post"]),
  upload.single("image"),
  updateBlogBySlug
);

// Soft delete a blog post
router.patch(
  "/soft-delete/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["delete-post"]),
  softDeletePost
);

// Flag a post
router.patch(
  "/flag/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["flag-post"]),
  flagPost
);

// Delete a blog post
router.delete(
  "/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["delete-post"]),
  deleteBlogBySlug
);

module.exports = router;
