const FlaggedPost = require("../models/FlaggedPost");
const Blog = require("../models/Blog");
const { Blog, ArchivedBlog } = require("../models/Archive");

const getFlaggedPosts = async (req, res) => {
  try {
    const flaggedPosts = await FlaggedPost.find({})
      .populate("postId")
      .populate("flaggedBy", "name");
    res.status(200).json(flaggedPosts);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
};

const getFlaggedBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, flagged: true });
    if (!blog)
      return res
        .status(400)
        .json({ status: "error", message: "No flagged blog is found." });
    res.json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
};

const approveFlaggedBlog = async (req, res) => {
  console.log("Approving flagged post...");
  const { slug } = req.params;
  const adminId = req.user.id; // Admin reviewing the flag
  const { reviewComment } = req.body;
  try {
    const flaggedPost = await FlaggedPost.findOne({ flaggedSlug: slug });
    if (!flaggedPost)
      return res
        .status(404)
        .json({ status: "error", message: "No flagged blog is found." });

    // Update flagged post review status
    flaggedPost.reviewStatus = "approved";
    flaggedPost.reviewedBy = adminId;
    flaggedPost.reviewComment = reviewComment;
    flaggedPost.updatedAt = new Date();

    const flaggedBlog = await flaggedPost.save();
    console.log("Flagging blog", flaggedBlog);

    // Also update the Blog collection to reflect approval
    const blogPost = await Blog.findOne({ slug });
    if (!blogPost)
      return res
        .status(400)
        .json({ status: "error", message: "No approved blogPost is found." });

    if (!blogPost.isFlagged)
      return res
        .status(400)
        .json({ status: "error", message: "Post is not flagged for review." });

    if (blogPost) {
      blogPost.isFlagged = true;
      blogPost.flagCount = flaggedPost.flaggedBy.length; // Set correct flag count
      blogPost.reviewStatus = "approved";
      blogPost.flagCount = 0;
      blogPost.flaggedBy = [];
      blogPost.lastFlaggedAt = null;

      const updatedBlog = await blogPost.save();
      console.log("Updated blog:", updatedBlog);
      res
        .status(200)
        .json({ status: "error", message: "Post is approved successfully!" });
    }
  } catch (error) {
    console.error("Error in approving blog.", error);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error!" });
  }
};

const rejectFlaggedBlog = async (req, res) => {
  try {
    console.log("Reject blog route is hit!");
    const { slug } = req.params;
    const { reviewComment } = req.body;
    const adminId = req.user.id;

    console.log("Flagged Slug:", slug);
    console.log("Admin Id:", adminId);
    console.log("Review comment:", reviewComment);

    const flaggedPost = await FlaggedPost.findOne({ flaggedSlug: slug });

    if (!flaggedPost)
      return res
        .status(404)
        .json({ status: "error", message: "No flagged blog is found!" });

    console.log("Flagged Blog post:", flaggedPost);

    // Mark as rejected
    flaggedPost.reviewStatus = "rejected";
    flaggedPost.reviewedBy = adminId;
    flaggedPost.reviewComment = reviewComment;
    const savedFlaggedBlog = await flaggedPost.save();
    console.log("Saving flagged Blog", savedFlaggedBlog);

    const blogPost = await Blog.findOne({ slug });
    console.log("Blog found to update:", blogPost);
    if (!blogPost)
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found." });

    if (!blogPost.isFlagged)
      return res
        .status(404)
        .json({ status: "error", message: "Blog is not flagged for review." });

    blogPost.isFlagged = false;
    blogPost.flagCount = 0;
    blogPost.flaggedBy = [];
    blogPost.lastFlaggedAt = null;

    await blogPost.save();
    res.status(200).json({
      status: "success",
      message: "Blog post review status is rejected.",
    });
  } catch (error) {
    console.error("Error in rejecting blog flag status.", error);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
};

const undoRejection = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog.flagged)
      return res.status(400).json({
        status: "error",
        message: "Blog post is not flagged for review.",
      });
    blog.reviewStatus = "rejected";
    blog.save();
    res.status(200).json({
      status: "error",
      message: "Blog flagged status is rejected successfully!",
    });
  } catch (error) {
    console.error("Error in undoing rejection.", error);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
};

module.exports = {
  getFlaggedPosts,
  getFlaggedBlogBySlug,
  approveFlaggedBlog,
  rejectFlaggedBlog,
  undoRejection,
};
