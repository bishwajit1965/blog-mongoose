const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

const addComment = async (req, res) => {
  const { slug } = req.params;
  const { name, email, content, parentId } = req.body;
  const userId = req.user.id;
  console.log("User Id:", userId);

  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ message: "Blog not found." });

    const existingComment = parentId
      ? null
      : await Comment.findOne({
          author: userId,
          post: blog._id,
          parent: null, // only check for top-level duplicates
        });
    console.log("Existing comment: ", existingComment);

    if (!parentId && existingComment) {
      return res
        .status(400)
        .json({ message: "You have already commented on this post." });
    }

    let level = 0;
    let parent = null;
    console.log("Parent Comment ID:", parentId);

    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        return res.status(400).json({ message: "Parent comment not found." });
      }
      console.log("Parent Comment:", parentComment);

      level = parentComment.level + 1;
      console.log("New Comment Level:", level);

      if (level > 2) {
        return res
          .status(400)
          .json({ message: "Maximum nesting level reached." });
      }
      parent = parentComment._id;
    }

    const comment = await Comment.create({
      name,
      email,
      content,
      post: blog._id,
      author: userId,
      parent,
      level,
    });
    res.status(201).json({
      success: true,
      message: "The post comment is successful!",
      comment,
    });
  } catch (error) {
    console.error("Error in adding comment", error);
    res
      .status(500)
      .json({ message: "Internal server error in creating comment." });
  }
};

// Helper function for fetching nested levelled comments
const nestComments = (comments, parentId = null, level = 0) => {
  return comments
    .filter((comment) => String(comment.parent) === String(parentId))
    .map((comment) => {
      const obj = comment.toObject ? comment.toObject() : comment;
      return {
        ...obj,
        level,
        replies: nestComments(comments, comment._id, level + 1),
      };
    });
};

// Get all comments for a post in front end
const getComments = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ message: "Blog post not found." });

    const flatComments = await Comment.find({
      post: blog._id,
      status: "approved",
    })
      .populate("author", "name email avatar")
      .sort({ createdAt: -1 });
    console.log("Fetched comments in frontend", flatComments);
    const nestedComments = nestComments(flatComments);

    res.status(200).json(nestedComments);
  } catch (error) {
    console.error("Error in fetching comments.", error);
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching comments.",
    });
  }
};

// Update comment for front end users
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user.id;
  console.log("Edit comment route is hit"); //✅
  console.log("CommentId:", id);
  console.log("Comment content:", content);
  console.log("User Id::", userId);
  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found." });
    }
    if (comment.author.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    console.log("Comment found:", comment);
    comment.content = content;
    await comment.save();
    res.json({ success: true, comment });
  } catch (error) {}
};

// Delete comment for frontend users
const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id; // Assuming you are using auth middleware and attaching user info
  const userRole = req.user?.role;

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check if the user is the comment owner or an admin
    if (
      comment.author.toString() !== userId.toString() &&
      userRole !== "super-admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }

    await Comment.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting comment",
    });
  }
};

module.exports = {
  addComment,
  getComments,
  updateComment,
  deleteComment,
};
