const mongoose = require("mongoose");
const User = require("../models/User");

// Follow a user
const followUser = async (req, res) => {
  console.log("🚀 📌 Follow user controller method is hit");
  try {
    const followerId = req.user.id; // Mongo _id of logged-in user
    const followeeId = req.params.authorId; // Mongo _id from URL

    console.log("FOLLOWER ID", followerId);
    console.log("FOLLOWEE ID", followerId);

    if (followerId === followeeId) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot follow yourself." });
    }

    // Fetch both users
    const [follower, followee] = await Promise.all([
      User.findById(followerId),
      User.findById(followeeId),
    ]);

    if (!follower || !followee) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Prevent duplicate follow
    if (
      follower.following.some((id) => id.toString() === followee._id.toString())
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Already following." });
    }

    // Update both sides
    follower.following.push(followee._id);
    followee.followers.push(follower._id);

    await Promise.all([follower.save(), followee.save()]);

    res.status(200).json({
      success: true,
      message: "Followed successfully.",
      followersCount: followee.followers.length,
      followingCount: follower.following.length,
    });
  } catch (err) {
    console.error("Follow error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followeeId = req.params.authorId;

    if (followerId === followeeId) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot unfollow yourself." });
    }

    const [follower, followee] = await Promise.all([
      User.findById(followerId),
      User.findById(followeeId),
    ]);

    if (!follower || !followee) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Remove followee from follower's following
    follower.following = follower.following.filter(
      (id) => id.toString() !== followee._id.toString(),
    );

    // Remove follower from followee's followers
    followee.followers = followee.followers.filter(
      (id) => id.toString() !== follower._id.toString(),
    );

    await Promise.all([follower.save(), followee.save()]);

    res.status(200).json({
      success: true,
      message: "Unfollowed successfully.",
      followersCount: followee.followers.length,
      followingCount: follower.following.length,
    });
  } catch (err) {
    console.error("Unfollow error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { followUser, unfollowUser };
