const {
  getAuthorFollowStatusService,
} = require("../services/publicAuthorFollowStatusService");

const User = require("../models/User");

const getAuthorFollowStatus = async (req, res) => {
  console.log("🎯 📌Get author follow status controller method is hit");
  const { authorId } = req.params;

  const viewer = await User.findOne({
    email: req.user.email,
  }).select("_id");

  //   if (!viewer) {
  //     return {
  //       isFollowing: false,
  //     };
  //   }

  const viewerId = viewer._id;

  //   const viewerId = req.user?.id;

  const followStatus = await getAuthorFollowStatusService(authorId, viewerId);

  if (!followStatus) {
    return res.status(404).json({
      success: false,
      message: "Author not found.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Follow status fetched successfully.",
    data: followStatus,
  });
};

module.exports = {
  getAuthorFollowStatus,
};
