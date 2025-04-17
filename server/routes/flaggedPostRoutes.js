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
  addModeratorNote,
  changeReviewStatus,
  getFlaggedPostAnalytics,
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

/**==================================================
 * REVIEW STATUS TRACKING AND UPDATING RELATED ROUTES
 * ==================================================*/
// Add a moderator note to a flagged post
router.patch(
  "/:slug/moderator-note",
  authorizeRoles(["super-admin", "admin", "editor"]),
  authorizePermissions(["review-post"]),
  addModeratorNote
);

// Change review status manually (e.g., from under review → approved/rejected etc.)
router.patch(
  "/:slug/review-status",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["review-post"]),
  changeReviewStatus
);

// Get flagged post analytics (e.g., for dashboard insights)
router.get(
  "/analytics",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["view-analytics"]),
  getFlaggedPostAnalytics
);

module.exports = router;
