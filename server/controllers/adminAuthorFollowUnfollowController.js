const User = require("../models/User");

const getAllFollowers = async (req, res) => {
  const user = await User.findById(req.params.userId).populate(
    "followers",
    "name avatar firebaseUid email status createdAt",
  );

  res.status(200).json({
    success: true,
    message: "Followers fetched successfully.",
    followers: user.followers,
  });
};

const getAllFollowing = async (req, res) => {
  const user = await User.findById(req.params.userId).populate(
    "following",
    "name avatar firebaseUid email status createdAt",
  );

  res.status(200).json({
    success: true,
    message: "Following fetched successfully.",
    following: user.following,
  });
};

module.exports = { getAllFollowers, getAllFollowing };
