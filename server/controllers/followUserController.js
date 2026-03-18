const mongoose = require("mongoose");
const User = require("../models/User");

// Follow a user
const followUser = async (req, res) => {
  try {
    const followerId = req.user.id; // Mongo _id of logged-in user
    const followeeId = req.params.authorId; // Mongo _id from URL

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

// const User = require("../models/User");
// const mongoose = require("mongoose");

// // Follow a user
// const followUser = async (req, res) => {
//   try {
//     const followerId = req.user.id; // Mongo _id of logged-in user
//     const followeeId = req.params.authorId; // Mongo _id of the user to follow
//     console.log("Follower ID (req.user.id):", req.user.id);
//     console.log("Followee ID (req.params.authorId):", req.params.authorId);

//     if (!mongoose.Types.ObjectId.isValid(followeeId)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid authorId" });
//     }

//     if (followerId.equals(followeeId)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "You cannot follow yourself." });
//     }

//     const [follower, followee] = await Promise.all([
//       User.findById(followerId),
//       User.findById(followeeId),
//     ]);

//     console.log("Follower document:", follower);
//     console.log("Followee document:", followee);

//     if (!follower || !followee) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found." });
//     }

//     // Prevent duplicate following
//     if (
//       follower.following.some((id) => id.toString() === followee._id.toString())
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Already following." });
//     }

//     follower.following.push(followee._id);
//     followee.followers.push(follower._id);

//     await Promise.all([follower.save(), followee.save()]);

//     res.status(200).json({
//       success: true,
//       message: "Followed successfully.",
//       followersCount: followee.followers.length,
//       followingCount: follower.following.length,
//     });
//   } catch (err) {
//     console.error("Follow error:", err);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };

// // Unfollow a user
// const unfollowUser = async (req, res) => {
//   try {
//     const followerId = req.user.id;
//     const followeeId = req.params.authorId;

//     if (!mongoose.Types.ObjectId.isValid(followeeId)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid authorId" });
//     }

//     if (followerId.equals(followeeId)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "You cannot unfollow yourself." });
//     }

//     const [follower, followee] = await Promise.all([
//       User.findById(followerId),
//       User.findById(followeeId),
//     ]);

//     if (!follower || !followee) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found." });
//     }

//     // Remove follower/followee
//     follower.following = follower.following.filter(
//       (id) => id.toString() !== followee._id.toString(),
//     );

//     followee.followers = followee.followers.filter(
//       (id) => id.toString() !== !follower._id.toString(),
//     );

//     await Promise.all([follower.save(), followee.save()]);

//     res.status(200).json({
//       success: true,
//       message: "Unfollowed successfully.",
//       followersCount: followee.followers.length,
//       followingCount: follower.following.length,
//     });
//   } catch (err) {
//     console.error("Unfollow error:", err);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };

// module.exports = { followUser, unfollowUser };

// const User = require("../models/User");

// // Follow a user
// const followUser = async (req, res) => {
//   try {
//     const followerId = req.user.id; // Mongo _id from Firebase auth
//     const followeeId = req.params.authorId; // Mongo _id from frontend

//     if (followerId === followeeId) {
//       return res.status(400).json({
//         success: false,
//         message: "You cannot follow yourself.",
//       });
//     }

//     const [follower, followee] = await Promise.all([
//       User.findById(followerId),
//       User.findById(followeeId),
//     ]);

//     if (!follower || !followee) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     // Check if already following
//     if (follower.following.some((id) => id.equals(followee._id))) {
//       return res.status(400).json({
//         success: false,
//         message: "Already following.",
//       });
//     }

//     // Add to following/followers
//     follower.following.push(followee._id);
//     followee.followers.push(follower._id);

//     await Promise.all([follower.save(), followee.save()]);

//     res.status(200).json({
//       success: true,
//       message: "Followed successfully.",
//       followersCount: followee.followers.length,
//       followingCount: follower.following.length,
//     });
//   } catch (err) {
//     console.error("Follow error:", err);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };

// // Unfollow a user
// const unfollowUser = async (req, res) => {
//   try {
//     const followerId = req.user.id;
//     const followeeId = req.params.authorId;

//     if (followerId === followeeId) {
//       return res.status(400).json({
//         success: false,
//         message: "You cannot unfollow yourself.",
//       });
//     }

//     const [follower, followee] = await Promise.all([
//       User.findById(followerId),
//       User.findById(followeeId),
//     ]);

//     if (!follower || !followee) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     // Remove from following/followers
//     follower.following = follower.following.filter(
//       (id) => !id.equals(followee._id),
//     );
//     followee.followers = followee.followers.filter(
//       (id) => !id.equals(follower._id),
//     );

//     await Promise.all([follower.save(), followee.save()]);

//     res.status(200).json({
//       success: true,
//       message: "Unfollowed successfully.",
//       followersCount: followee.followers.length,
//       followingCount: follower.following.length,
//     });
//   } catch (err) {
//     console.error("Unfollow error:", err);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };

// module.exports = { followUser, unfollowUser };

// const User = require("../models/User");

// const followUser = async (req, res) => {
//   console.log("🚀 Follow User method is hit");
//   try {
//     const followerUid = req.user.uid; // logged-in Firebase user
//     const followeeUid = req.params.authorId; // passed in URL

//     if (followerUid === followeeUid) {
//       return res
//         .status(400)
//         .json({ success: false, message: "You cannot follow yourself." });
//     }

//     const [follower, followee] = await Promise.all([
//       User.findOne({ firebaseUid: followerUid }),
//       User.findOne({ firebaseUid: followeeUid }),
//     ]);

//     if (!follower || !followee) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found." });
//     }

//     if (follower.following.includes(followeeUid)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Already following." });
//     }

//     follower.following.push(followeeUid);
//     followee.followers.push(followerUid);

//     await Promise.all([follower.save(), followee.save()]);

//     res.status(200).json({
//       success: true,
//       message: "Followed successfully.",
//       followersCount: followee.followers.length,
//       followingCount: follower.following.length,
//     });
//   } catch (err) {
//     console.error("Follow error:", err);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };

// const unfollowUser = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById({ _id: userId });
//     const followerUid = user.firebaseUid; // Firebase UID of logged-in user

//     const followeeUid = req.params.authorId;

//     if (!followerUid || !followeeUid) {
//       return res.status(400).json({
//         success: false,
//         message: "Follower or followee UID missing",
//       });
//     }

//     if (followerUid === followeeUid) {
//       return res
//         .status(400)
//         .json({ success: false, message: "You cannot unfollow yourself." });
//     }

//     const [follower, followee] = await Promise.all([
//       User.findOne({ firebaseUid: followerUid }),
//       User.findOne({ firebaseUid: followeeUid }),
//     ]);

//     if (!follower || !followee) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found." });
//     }

//     // plain string filtering
//     follower.following = follower.following.filter(
//       (uid) => uid !== followeeUid,
//     );
//     followee.followers = followee.followers.filter(
//       (uid) => uid !== followerUid,
//     );

//     await Promise.all([follower.save(), followee.save()]);

//     res.status(200).json({
//       success: true,
//       message: "Unfollowed successfully.",
//       followersCount: followee.followers.length,
//       followingCount: follower.following.length,
//     });
//   } catch (error) {
//     console.error("Unfollow error:", error);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };

// module.exports = { followUser, unfollowUser };
