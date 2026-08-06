const User = require("../models/User");

const getAuthorFollowStatusService = async (authorId, viewerId) => {
  try {
    const viewer = await User.findById(viewerId).select("following");

    if (!viewer) {
      return {
        isFollowing: false,
      };
    }

    // Extract followed author IDs
    const followingAuthorIds = viewer.following;

    // Fetch authors from following list
    const followedAuthors = await User.find({
      _id: {
        $in: followingAuthorIds,
      },
    }).select("_id");

    // Verify requested author exists
    const isFollowing = followedAuthors.some(
      (author) => author._id.toString() === authorId.toString(),
    );

    return {
      isFollowing,
    };
  } catch (error) {
    console.error(error);

    return {
      isFollowing: false,
    };
  }
};

module.exports = {
  getAuthorFollowStatusService,
};
