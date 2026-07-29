const express = require("express");
const {
  getAuthorPublicProfile,
  authorProfileBlogCount,
  getAuthorProfileLatestPosts,
  getAuthorProfileComingSoonPosts,
  getAuthorOnlineStatus,
  getPublicAuthor,
  getAuthorFollowers,
} = require("../controllers/publicAuthorProfileController");
const router = express.Router();

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

// router.use(authenticateToken);

// router.use(authorizePermissions(["user", "super-admin", "admin"]));

router.get("/profile/:authorId", getAuthorPublicProfile);

router.get("/blogs/:authorId", authorProfileBlogCount);

router.get("/latest-posts/:authorId", getAuthorProfileLatestPosts);

router.get("/coming-soon/:authorId", getAuthorProfileComingSoonPosts);

router.get("/is-online/:authorId", getAuthorOnlineStatus);

router.get("/author-data", getPublicAuthor);

router.get("/followers/:authorId", getAuthorFollowers);

module.exports = router;
