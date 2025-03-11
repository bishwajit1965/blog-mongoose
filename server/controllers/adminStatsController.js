const User = require("../models/User");

const fetchUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const inactiveUsers = totalUsers - activeUsers;

    res.status(200).json({ totalUsers, activeUsers, inactiveUsers });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error in fetching user stats",
      error,
    });
  }
};

const fetchRecentUsers = async (req, res) => {
  try {
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("roles", "name")
      .populate("permissions", "name")
      .select("name email roles permissions isActive createdAt");
    res.status(200).json(recentUsers);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error in fetching recent users.",
      error,
    });
  }
};

module.exports = { fetchUserStats, fetchRecentUsers };
