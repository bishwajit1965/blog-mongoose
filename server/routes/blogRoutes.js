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

router.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/sitemap.xml"));
});

// Authenticate all admin routes routes those follow it
router.use(authenticateToken);

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

// Delete a blog post
router.delete(
  "/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["delete-post"]),
  deleteBlogBySlug
);

module.exports = router;
