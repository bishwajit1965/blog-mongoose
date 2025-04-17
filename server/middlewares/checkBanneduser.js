const User = require("../models/User");

const checkBannedUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.isBanned) {
      if (!user.banExpiresAt || new Date() < user.banExpiresAt) {
        return res.status(403).json({
          message: "You are banned from performing this operation.",
        });
      } else {
        // Optional: Auto unban if ban has expired
        user.isBanned = false;
        user.banExpiresAt = null;
        await user.save();
      }
    }

    next();
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { checkBannedUser };
