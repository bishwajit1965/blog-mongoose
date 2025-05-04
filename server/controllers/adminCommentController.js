const Comment = require("../models/Comment");

// Get all comments for admin panel
const getAllCommentsForAdmin = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("post", "title slug")
      .populate("author", "name email avatar")
      .populate("reviewHistory.reviewedBy", "name email avatar")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error in fetching comments.", error);
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching all comments.",
    });
  }
};

// Approve comments in admin panel
const approveComment = async (req, res) => {
  const { id } = req.params;
  const { status, reviewComment } = req.body;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found." });
    }

    // Limit approval limit to 3 times
    const approvalCount = comment.reviewHistory.filter(
      (rh) => rh.status === "approved"
    ).length;
    if (approvalCount >= 3)
      return res
        .status(403)
        .json({ message: "Restricted !!! Approval limit expired." });

    comment.status = "approved";
    comment.status = status;
    comment.reviewComment = reviewComment;
    comment.reviewedBy = req.user._id;
    comment.reviewHistory.push({
      status,
      reviewComment,
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
    });
    await comment.save();
    res
      .status(201)
      .json({ success: true, message: "Comment is approved successfully." });
  } catch (error) {
    console.error("Error in approving comment", error);
    res.status(500).json({
      success: false,
      message: "Internal server error in approving comment.",
    });
  }
};

// Reject comment form admin panel
const rejectComment = async (req, res) => {
  const { id } = req.params;
  const { status, reviewComment } = req.body;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    // Restrict rejection limit up to 3
    const rejectionCount = comment.reviewHistory.filter(
      (rh) => rh.status === "rejected"
    ).length;
    if (rejectionCount >= 3)
      return res.status(403).json({
        message: "Restricted !!! Rejection limit expired.",
      });

    comment.status = "rejected";
    comment.status = status;
    comment.reviewComment = reviewComment;
    comment.reviewedBy = req.user.id;
    comment.reviewHistory.push({
      status,
      reviewComment,
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
    });
    await comment.save();
    res
      .status(201)
      .json({ success: true, message: "Comment is rejected successfully." });
  } catch (error) {
    console.error("Error in rejecting comment", error);
    res.status(500).json({
      success: false,
      message: "Internal server error in rejecting comment.",
    });
  }
};

// Delete comment from admin
const deleteCommentByAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    await Comment.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully by admin.",
    });
  } catch (error) {
    console.error("Admin comment deletion failed:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting comment",
    });
  }
};

module.exports = {
  getAllCommentsForAdmin,
  approveComment,
  rejectComment,
  deleteCommentByAdmin,
};
