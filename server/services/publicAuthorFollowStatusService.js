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

// const getAuthorFollowStatusService = async (authorId, viewerId) => {
//   console.log("SERVICE AUTHOR ID:", authorId);
//   console.log("SERVICE VIEWER ID:", viewerId);

//   const viewer = await User.findById(viewerId).select("following");

//   console.log("VIEWER FROM DB:", viewer);

//   const isFollowing = viewer.following.some(
//     (id) => id.toString() === authorId.toString(),
//   );

//   console.log("IS FOLLOWING RESULT:", isFollowing);

//   return {
//     isFollowing,
//   };
// };

module.exports = {
  getAuthorFollowStatusService,
};

// const getAuthorFollowStatusService = async (authorId, viewerId) => {
//   try {
//     if (!viewerId) {
//       return {
//         isFollowing: false,
//       };
//     }

//     const author = await User.findById(authorId).select("followers");

//     if (!author) {
//       return null;
//     }

//     const isFollowing = author.followers.some(
//       (followerId) => followerId.toString() === viewerId.toString(),
//     );

//     return {
//       isFollowing,
//     };
//   } catch (error) {
//     console.error("Error fetching follow status:", error);
//   }
// };

// module.exports = {
//   getAuthorFollowStatusService,
// };
