const User = require("../models/User");

const getAuthorFollowStatusService = async (authorId, viewerId) => {
  try {
    if (!viewerId) {
      return {
        isFollowing: false,
      };
    }

    const author = await User.findById(authorId).select("followers");

    if (!author) {
      return null;
    }

    const isFollowing = author.followers.some(
      (followerId) => followerId.toString() === viewerId.toString(),
    );

    return {
      isFollowing,
    };
  } catch (error) {
    console.error("Error fetching follow status:", error);
  }
};

module.exports = {
  getAuthorFollowStatusService,
};
