const express = require("express");

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

const {
  getFlaggedPosts,
  approveFlaggedBlog,
  rejectFlaggedBlog,
  revertFlaggedBlogStatus,
  undoRejection,
} = require("../controllers/flaggedBlogController");

const router = express.Router();

// Authenticate all admin routes routes those follow it
router.use(authenticateToken);

// Create a new blog post
router.get(
  "/",
  authorizeRoles(["super-admin", "admin", "editor"]),
  authorizePermissions(["view-post"]),
  getFlaggedPosts
);

/**=========================================
 * REVIEW RELATED ROUTES
 * =========================================*/
// Fetch a flagged blog post for approval of flagged status
router.patch(
  "/approve/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["approve-post"]),
  approveFlaggedBlog
);

// Fetch a flagged blog post for rejection
router.patch(
  "/reject/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["reject-post"]),
  rejectFlaggedBlog
);

// Revert review status approved/rejected
router.patch(
  "/revert-review-status/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["undo-reviewed-post"]),
  revertFlaggedBlogStatus
);

// Undo rejection of a flagged post
router.patch(
  "/undo-reject/:slug",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["undo-rejected-post"]),
  undoRejection
);

module.exports = router;
