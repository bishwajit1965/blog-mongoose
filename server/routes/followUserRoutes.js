// routes/followUserRoutes.js
const express = require("express");
const router = express.Router();

const {
  followUser,
  unfollowUser,
} = require("../controllers/followUserController");

const { firebaseAuth } = require("../middlewares/firebaseAuth");
const authenticateUser = require("../middlewares/authenticateUser");

router.use(authenticateUser);

// Now using authorId (Mongo _id) instead of Firebase UID
router.put("/:authorId/follow", followUser);
router.delete("/:authorId/unfollow", unfollowUser);

module.exports = router;
