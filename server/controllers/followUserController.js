const User = require("../models/User");

const followUser = async (req, res) => {
  console.log("🚀 Follow User method is hit");
  try {
    const followerUid = req.user.uid; // logged-in Firebase user
    const followeeUid = req.params.authorId; // passed in URL

    if (followerUid === followeeUid) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot follow yourself." });
    }

    const [follower, followee] = await Promise.all([
      User.findOne({ firebaseUid: followerUid }),
      User.findOne({ firebaseUid: followeeUid }),
    ]);

    if (!follower || !followee) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (follower.following.includes(followeeUid)) {
      return res
        .status(400)
        .json({ success: false, message: "Already following." });
    }

    follower.following.push(followeeUid);
    followee.followers.push(followerUid);

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

const unfollowUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById({ _id: userId });
    const followerUid = user.firebaseUid; // Firebase UID of logged-in user

    const followeeUid = req.params.authorId;

    if (!followerUid || !followeeUid) {
      return res.status(400).json({
        success: false,
        message: "Follower or followee UID missing",
      });
    }

    if (followerUid === followeeUid) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot unfollow yourself." });
    }

    const [follower, followee] = await Promise.all([
      User.findOne({ firebaseUid: followerUid }),
      User.findOne({ firebaseUid: followeeUid }),
    ]);

    if (!follower || !followee) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // plain string filtering
    follower.following = follower.following.filter(
      (uid) => uid !== followeeUid,
    );
    followee.followers = followee.followers.filter(
      (uid) => uid !== followerUid,
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
