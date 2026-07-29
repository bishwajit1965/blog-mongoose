const express = require("express");
const {
  getAllFollowers,
  getAllFollowing,
} = require("../controllers/adminAuthorFollowUnfollowController");

const router = express.Router();

router.get("/user/:userId/followers", getAllFollowers);

router.get("/user/:userId/following", getAllFollowing);

module.exports = router;
// follow / unfollow / author;
