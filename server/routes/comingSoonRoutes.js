const express = require("express");

const { getComingSoonPosts } = require("../controllers/comingSoonController");

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

const router = express.Router();

router.use(authenticateToken);

// Fetch coming soon posts
router.get(
  "/coming-soon",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["view-post"]),
  getComingSoonPosts
);

module.exports = router;
