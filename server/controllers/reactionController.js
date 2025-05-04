const Reaction = require("../models/Reaction");
const Blog = require("../models/Blog");

// Like or dislike a post
const reactToPost = async (req, res) => {
  const { slug } = req.params;
  const userId = req.user.id;
  const { type } = req.body;
  console.log("React to post route is hit");
  console.log("slug", slug);
  console.log("User Id", userId);
  console.log("Type", type);

  if (!["like", "dislike"].includes(type)) {
    return res.status(400).json({ message: "Invalid reaction type." });
  }

  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ message: "Blog not found!" });

    console.log("Blog found", blog);
    // Check if reactions exist
    const existing = await Reaction.findOne({
      user: userId,
      blogPost: blog._id,
    });

    if (existing) {
      if (existing.type === type) {
        return res
          .status(400)
          .json({ message: `You have already ${type}d this post.` });
      } else {
        existing.type = type;
        await existing.save();
      }
      return res
        .status(200)
        .json({ success: true, message: `Changed to ${type} successfully!` });
    }

    // Create new reaction
    const reaction = new Reaction({
      blogPost: blog._id,
      user: userId,
      type,
    });
    await reaction.save();
    return res.status(201).json({
      success: true,
      message: `You have successfully ${type}d the post!`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in reacting to post",
      error: error.message,
    });
  }
};

// Get all likes and dislikes
const getReactionsForPost = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ message: "Blog not found!" });
    const reactions = await Reaction.find({ blogPost: blog._id });
    const likeCount = reactions.filter((r) => r.type === "like").length;
    const dislikeCount = reactions.filter((r) => r.type === "dislike").length;
    res.status(200).json({ likeCount, dislikeCount });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in fetching likes and dislikes",
      error: error.message,
    });
  }
};

module.exports = { reactToPost, getReactionsForPost };
