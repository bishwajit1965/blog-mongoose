const express = require("express");

const router = express.Router();

const {
  followUser,
  unfollowUser,
} = require("../controllers/followUserController");

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

// Middleware to authenticate token for the following routes
// This middleware checks if the user is logged in and has a valid token
router.use(authenticateToken);

// Route to follow a user
router.put("/:firebaseUid/follow", followUser);

// Route to unfollow a user
router.delete("/:firebaseUid/unfollow", unfollowUser);

module.exports = router;
