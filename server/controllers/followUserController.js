const User = require("../models/User");

const followUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById({ _id: userId });
    console.log("USER DATA", user);
    const followerId = req.user?.id; // logged-in user _id
    const followeeId = req.params.authorId; // author _id from route

    console.log("Follower ID", followerId);
    console.log("Followee ID", followeeId);

    if (!followerId || !followeeId) {
      return res
        .status(400)
        .json({ success: false, message: "Follower or followee ID missing" });
    }

    if (followerId === followeeId) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot follow yourself." });
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

    if (follower.following.some((id) => id.equals(followee._id))) {
      return res
        .status(400)
        .json({ success: false, message: "Already following." });
    }

    follower.following.push(followee._id);
    followee.followers.push(follower._id);

    await Promise.all([follower.save(), followee.save()]);

    res.status(200).json({
      success: true,
      message: "Followed successfully.",
      followersCount: followee.followers.length,
      followingCount: follower.following.length,
    });
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user?._id;
    const followeeId = req.params.authorId;

    if (!followerId || !followeeId) {
      return res
        .status(400)
        .json({ success: false, message: "Follower or followee ID missing" });
    }

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

    follower.following = follower.following.filter(
      (id) => !id.equals(followee._id),
    );
    followee.followers = followee.followers.filter(
      (id) => !id.equals(follower._id),
    );

    await Promise.all([follower.save(), followee.save()]);

    res.status(200).json({
      success: true,
      message: "Unfollowed successfully.",
      followersCount: followee.followers.length,
      followingCount: follower.following.length,
    });
  } catch (error) {
    console.error("Unfollow error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { followUser, unfollowUser };
