const express = require("express");
const upload = require("../middlewares/upload");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlogBySlug,
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

// Create a new blog post
router.post(
  "/",
  authorizeRoles(["super-admin"]),
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

// Update a blog post
router.patch(
  "/:slug",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["edit-post"]),
  upload.single("image"),
  updateBlogBySlug
);

// Delete a blog post
router.delete(
  "/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["delete-post"]),
  deleteBlogBySlug
);

module.exports = router;
