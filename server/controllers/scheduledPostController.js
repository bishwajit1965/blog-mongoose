const Blog = require("../models/Blog");

const getScheduledPosts = async (req, res) => {
  try {
    const scheduledPosts = await Blog.find({ status: "scheduled" });
    return res.status(200).json(scheduledPosts);
  } catch (error) {
    console.error("Error in fetching scheduled posts", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error in fetching scheduled posts.",
    });
  }
};

module.exports = { getScheduledPosts };
