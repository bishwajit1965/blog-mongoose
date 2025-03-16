const express = require("express");

const { getScheduledPosts } = require("../controllers/scheduledPostController");

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

const router = express.Router();

router.use(authenticateToken);

// Fetch scheduled posts
router.get(
  "/scheduled-posts",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["view-post"]),
  getScheduledPosts
);

module.exports = router;
