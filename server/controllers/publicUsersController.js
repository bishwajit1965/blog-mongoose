const User = require("../models/User");

const getAllMongoUsers = async (req, res) => {
  const mongoUsers = await User.find({});
  return res.status(200).json({
    success: true,
    message: "Users fetched successfully.",
    mongoUsers,
  });
};

module.exports = { getAllMongoUsers };
