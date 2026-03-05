const User = require("../models/User");

/// Follow a user
const followUser = async (req, res) => {
  const loggedInUser = req.user.id;
  const firebaseUid = req.params.firebaseUid;
  const follower = await User.findOne({ firebaseUid });
  const followee = await User.findById(req.body.firebaseUid);

  console.log("Follower =>", follower);
  console.log("Followee =>", followee);
  console.log("Logged in user =>", loggedInUser);
  console.log("Logged in user UID =>", loggedInUser.firebaseUid);

  // if (follower === followee) {
  //   return res.status(400).json({ message: "You cannot follow yourself." });
  // }

  try {
    const [loggedInUserDoc, targetUser] = await Promise.all([
      User.findOne({ firebaseUid: follower }),
      User.findOne({ firebaseUid: followee }),
    ]);

    // if (!targetUser) {
    //   return res.status(404).json({ message: "Target user not found." });
    // }

    // if (!loggedInUserDoc) {
    //   return res.status(404).json({ message: "Logged-in user not found." });
    // }

    // if (loggedInUserDoc.following.includes(followee)) {
    //   return res.status(400).json({ message: "Already following this user." });
    // }

    loggedInUserDoc.following.push(followee);
    targetUser.followers.push(follower);

    await Promise.all([loggedInUserDoc.save(), targetUser.save()]);

    return res.status(200).json({ message: "Successfully followed the user." });
  } catch (error) {
    console.error("Error following user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  const follower = req.user.firebaseUid;
  const followee = req.params.firebaseUid;

  if (follower === followee) {
    return res.status(400).json({ message: "You cannot unfollow yourself." });
  }

  try {
    const [loggedInUserDoc, targetUser] = await Promise.all([
      User.findOne({ firebaseUid: follower }),
      User.findOne({ firebaseUid: followee }),
    ]);

    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found." });
    }

    if (!loggedInUserDoc) {
      return res.status(404).json({ message: "Logged-in user not found." });
    }

    if (!loggedInUserDoc.following.includes(followee)) {
      return res
        .status(400)
        .json({ message: "You are not following this user." });
    }

    loggedInUserDoc.following = loggedInUserDoc.following.filter(
      (uid) => uid !== followee
    );
    targetUser.followers = targetUser.followers.filter(
      (uid) => uid !== follower
    );

    await Promise.all([loggedInUserDoc.save(), targetUser.save()]);

    return res
      .status(200)
      .json({ message: "Successfully unfollowed the user." });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  followUser,
  unfollowUser,
};
