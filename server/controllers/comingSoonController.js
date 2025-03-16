const Blog = require("../models/Blog");
const io = require("socket.io");

const getComingSoonPosts = async (req, res) => {
  try {
    const comingSoonPosts = await Blog.find({ status: "coming-soon" });
    return res.status(200).json(comingSoonPosts);
  } catch (error) {
    console.error("Error in fetching coming soon posts", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error in fetching coming soon posts.",
    });
  }
};

const getPublishedPosts = async (req, res) => {
  try {
    const publishedPosts = await Blog.find({ status: "published" })
      .sort({ updatedAt: -1 })
      .limit(5);
    res.status(200).json(publishedPosts);
    // After publishing posts, emit a notification to the admin
    io.emit(
      "publish-alert",
      `A post titled "${post.title}" has been published!`
    );
  } catch (error) {
    console.error("Error in fetching published posts", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error in fetching published posts.",
    });
  }
};

module.exports = { getComingSoonPosts, getPublishedPosts };
