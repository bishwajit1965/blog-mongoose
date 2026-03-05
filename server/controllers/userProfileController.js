const User = require("../models/User");

// Fetch all users with firebaseUid
const getAllUsers = async (req, res) => {
  console.log("User list route hit");
  try {
    const users = await User.find()
      .populate("roles")
      .populate("permissions")
      .populate("firebaseUid");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
};

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    const { id: firebaseUid } = req.user;
    const updateData = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid },
      updateData,
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Followers
const getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate(
      "followers",
      "username avatar"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.followers);
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Following
const getFollowing = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate(
      "following",
      "username avatar"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.following);
  } catch (error) {
    console.error("Error fetching following:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Follow User
const followUser = async (req, res) => {
  const { userId } = req.user; // Current logged-in user
  const { targetUserId } = req.params;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    if (user.following.includes(targetUserId)) {
      return res.status(400).json({ message: "Already following this user" });
    }

    user.following.push(targetUserId);
    targetUser.followers.push(userId);

    await user.save();
    await targetUser.save();

    res.json({ message: `Now following ${targetUser.username}` });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Unfollow User
const unfollowUser = async (req, res) => {
  const { userId } = req.user;
  const { targetUserId } = req.params;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    user.following = user.following.filter(
      (id) => id.toString() !== targetUserId
    );
    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== userId
    );

    await user.save();
    await targetUser.save();

    res.json({ message: `Unfollowed ${targetUser.username}` });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getFollowers,
  getFollowing,
  updateProfile,
  followUser,
  unfollowUser,
};
