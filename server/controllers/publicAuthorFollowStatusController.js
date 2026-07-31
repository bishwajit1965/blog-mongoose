const User = require("../models/User");
const {
  getAuthorFollowStatusService,
} = require("../services/publicAuthorFollowStatusService");

const getAuthorFollowStatus = async (req, res) => {
  try {
    const { authorId } = req.params;

    if (!req.user) {
      return res.status(200).json({
        success: true,
        message: "No logged-in user.",
        data: {
          isFollowing: false,
        },
      });
    }

    const viewerId = req.user._id;

    const followStatus = await getAuthorFollowStatusService(authorId, viewerId);

    return res.status(200).json({
      success: true,
      message: "Follow status fetched successfully.",
      data: followStatus,
    });
  } catch (error) {
    console.error("Follow status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch follow status.",
    });
  }
};

module.exports = {
  getAuthorFollowStatus,
};
