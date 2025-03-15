const Blog = require("../models/Blog");

const getComingSoonPosts = async (req, res) => {
  try {
    const posts = await Blog.find({ status: "coming-soon" });
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error in fetching coming soon posts", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error in fetching coming soon posts.",
    });
  }
};

module.exports = { getComingSoonPosts };
