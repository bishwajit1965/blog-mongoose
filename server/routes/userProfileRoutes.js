const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateProfile,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
} = require("../controllers/userProfileController");

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

// Verify auth token for the following routes
router.use(authenticateToken);

router.get("/", getAllUsers);

// Update User Profile
router.put("/me/edit", updateProfile);

// Get Followers
router.get("/:firebaseUid/followers", getFollowers);

// Get Following
router.get("/:firebaseUid/following", getFollowing);

// Follow User
router.put("/:firebaseUid/follow", followUser);

// Unfollow User
router.put("/:firebaseUid/unfollow", unfollowUser);

module.exports = router;
