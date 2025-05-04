const FlaggedPost = require("../models/FlaggedPost");
const Blog = require("../models/Blog");
const User = require("../models/User");
const AuditLog = require("../models/AuditLog");
const { createAuditLog } = require("./auditLogController");

const getFlaggedPosts = async (req, res) => {
  try {
    const flaggedPosts = await FlaggedPost.find({})
      .populate("postId")
      .populate("flaggedBy", "name email")
      .populate("userId", "name email avatar")
      .populate("reviewedBy", "name email avatar")
      .populate("statusHistory.changedBy", "name email")
      .populate("reviewHistory.reviewedBy");
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
  const reviewerId = req.user.id; // Admin reviewing the flag
  const { reviewComment } = req.body;
  console.log("Review Comment Received:", reviewComment);

  try {
    const flaggedPost = await FlaggedPost.findOne({ flaggedSlug: slug });
    if (!flaggedPost)
      return res
        .status(400)
        .json({ status: "error", message: "No flagged blog is found." });

    const now = new Date();
    // Update flagged post review status as approved
    flaggedPost.reviewStatus = "approved";
    flaggedPost.reviewedBy = reviewerId;
    flaggedPost.reviewedAt = now;
    flaggedPost.reviewComment = reviewComment || "flagging grounded";
    flaggedPost.reviewHistory.push({
      comment: reviewComment || "flagging grounded",
      reviewedAt: now,
      reviewedBy: reviewerId,
      status: "approved",
    });

    flaggedPost.updatedAt = now;

    const flaggedBlog = await flaggedPost.save();
    console.log("Flagging blog", flaggedBlog);

    // Also update the Blog collection to reflect approval
    const blogPost = await Blog.findOne({ slug });
    console.log("Blog post found:", blogPost);

    if (!blogPost)
      return res
        .status(400)
        .json({ status: "error", message: "No blogPost is found." });

    if (!blogPost.isFlagged)
      return res
        .status(400)
        .json({ status: "error", message: "Post is not flagged for review." });

    if (blogPost) {
      blogPost.isFlagged = false;
      blogPost.flagCount = 0;
      blogPost.reviewStatus = "approved";
      blogPost.flaggedBy = [];
      blogPost.lastFlaggedAt = null;
      if (!Array.isArray(blogPost.reviewedAt)) {
        blogPost.reviewedAt = [];
      }
      blogPost.reviewedAt.push(now);
      blogPost.reviewedBy = reviewerId;
      blogPost.reviewComment = reviewComment || "flagging grounded";
      blogPost.reviewHistory.push({
        comment: reviewComment || "flagging grounded",
        reviewedAt: now,
        reviewedBy: reviewerId,
      });
      console.log("Blog post status before save:", blogPost.reviewStatus);
      const updatedBlog = await blogPost.save();
      console.log("Updated blog:", updatedBlog);

      // Create the audit log for the approval action
      await createAuditLog({
        action: "review-approved",
        postId: flaggedPost._id,
        flaggedTitle: flaggedPost.flaggedTitle,
        flaggedSlug: flaggedPost.flaggedSlug,
        moderatorId: reviewerId,
        comment: reviewComment || "Approved due to policy violation",
        statusChange: { oldStatus: "flagged", newStatus: "approved" },
      });

      res
        .status(200)
        .json({ status: "success", message: "Post is approved successfully!" });
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
    const reviewerId = req.user.id;

    console.log("Flagged Slug:", slug);
    console.log("Admin Id:", reviewerId);
    console.log("Review comment:", reviewComment);

    const flaggedPost = await FlaggedPost.findOne({ flaggedSlug: slug });

    if (!flaggedPost)
      return res
        .status(404)
        .json({ status: "error", message: "No flagged blog is found!" });

    console.log("Flagged Blog post:", flaggedPost);

    const now = new Date();

    flaggedPost.reviewStatus = "rejected";
    flaggedPost.reviewedBy = reviewerId;
    flaggedPost.reviewedAt = now;
    flaggedPost.reviewComment = reviewComment || "no violation found";
    flaggedPost.reviewHistory.push({
      comment: reviewComment || "no violation found",
      reviewedAt: new Date(),
      reviewedBy: reviewerId,
      status: "rejected",
    });

    flaggedPost.updatedAt = now;

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

    if (blogPost) {
      blogPost.isFlagged = false;
      blogPost.flagCount = 0;
      blogPost.reviewStatus = "rejected";
      blogPost.flaggedBy = [];
      blogPost.lastFlaggedAt = null;
      if (!Array.isArray(blogPost.reviewedAt)) {
        blogPost.reviewedAt = [];
      }
      blogPost.reviewedAt.push(now);
      blogPost.reviewedBy = reviewerId;
      blogPost.reviewComment = reviewComment || "no violation found";
      blogPost.reviewHistory.push({
        comment: reviewComment || "no violation found",
        reviewedAt: now,
        reviewedBy: reviewerId,
      });

      const rejectedPost = await blogPost.save();
      console.log("Rejected blog:", rejectedPost);

      // Create the audit log for the rejection action
      await createAuditLog({
        action: "review-rejected",
        postId: flaggedPost._id,
        flaggedTitle: flaggedPost.flaggedTitle,
        flaggedSlug: flaggedPost.flaggedSlug,
        moderatorId: reviewerId,
        comment: reviewComment || "Rejected due to no policy violation",
        statusChange: { oldStatus: "flagged", newStatus: "rejected" },
      });

      res.status(200).json({
        status: "success",
        message: "Blog post review status is rejected.",
      });
    }
  } catch (error) {
    console.error("Error in rejecting blog flag status.", error);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
};

const toggleStatus = (currentStatus) => {
  if (currentStatus === "approved") return "rejected";
  if (currentStatus === "rejected") return "approved";
  return null;
};

const revertFlaggedBlogStatus = async (req, res) => {
  try {
    console.log("Reverting blog route is hit!");
    const { slug } = req.params;
    const reviewerId = req.user.id;
    const { reviewComment } = req.body;
    const now = new Date();

    /**==============================================
     * Fetch blog post by slug
     * ==============================================*/
    const blogPost = await Blog.findOne({ slug });
    console.log(" Blog post:", blogPost);

    if (!blogPost) {
      return res.status(404).json({
        status: "error",
        message: "Blog not found.",
      });
    }

    if (!["approved", "rejected"].includes(blogPost.reviewStatus)) {
      return res.status(400).json({
        status: "error",
        message: "Blog is not yet reviewed, so there's nothing to revert.",
      });
    }
    const previousBlogStatus = blogPost.reviewStatus;
    const newBlogStatus = toggleStatus(previousBlogStatus);

    if (blogPost.reviewHistory.length >= 3) {
      return res.status(400).json({
        status: "error",
        message: "Blog post has already been reverted 3 times.",
      });
    }

    blogPost.reviewStatus = newBlogStatus;
    blogPost.reviewedBy = reviewerId;
    blogPost.reviewComment = reviewComment || "review flag reverted";
    blogPost.updatedAt = now;
    if (!Array.isArray(blogPost.reviewedAt)) blogPost.reviewedAt = [];
    blogPost.reviewedAt.push(now);
    if (!Array.isArray(blogPost.reviewHistory)) blogPost.reviewHistory = [];
    blogPost.reviewHistory.push({
      comment: reviewComment || "review flag reverted",
      reviewedAt: now,
      reviewedBy: reviewerId,
      status: "reverted",
    });
    blogPost.statusHistory.push({
      status: "reverted",
      statusChange: {
        oldStatus: previousBlogStatus,
        newStatus: newBlogStatus,
      },
      changedAt: now,
      changedBy: reviewerId,
    });
    console.log("Almost saving reverted blog post:");

    const revertedBlog = await blogPost.save();
    console.log("Reverted Blog:", revertedBlog);

    /**==============================================
     * Update FlaggedPost document
     * ==============================================*/
    const flaggedPost = await FlaggedPost.findOne({ flaggedSlug: slug });
    if (!flaggedPost) {
      return res.status(404).json({
        status: "error",
        message: "No flagged blog found.",
      });
    }

    if (flaggedPost.reviewHistory.length >= 3) {
      return res.status(400).json({
        status: "error",
        message: "Flagged post has already been reverted 3 times.",
      });
    }
    const previousFlaggedPostStatus = flaggedPost.reviewStatus;
    const newFlaggedPostStatus = toggleStatus(previousFlaggedPostStatus);

    flaggedPost.reviewStatus = newFlaggedPostStatus;
    flaggedPost.reviewedBy = reviewerId;
    flaggedPost.updatedAt = now;

    if (!Array.isArray(flaggedPost.reviewedAt)) flaggedPost.reviewedAt = [];
    flaggedPost.reviewedAt.push(now);
    if (!Array.isArray(flaggedPost.reviewHistory))
      flaggedPost.reviewHistory = [];
    flaggedPost.reviewHistory.push({
      comment: reviewComment || "review flag reverted",
      reviewedAt: now,
      reviewedBy: reviewerId,
      status: "reverted",
    });
    flaggedPost.statusHistory.push({
      status: "reverted",
      statusChange: {
        oldStatus: previousFlaggedPostStatus,
        newStatus: newFlaggedPostStatus,
      },
      changedAt: now,
      changedBy: reviewerId,
    });

    const savedFlaggedPost = await flaggedPost.save();
    console.log("Updated flagged post:", savedFlaggedPost);

    await createAuditLog({
      action: "review-reverted",
      postId: flaggedPost._id,
      flaggedTitle: flaggedPost.flaggedTitle,
      flaggedSlug: flaggedPost.flaggedSlug,
      moderatorId: reviewerId,
      comment: reviewComment || "review flag reverted",
      statusChange: {
        oldStatus: previousFlaggedPostStatus,
        newStatus: newFlaggedPostStatus,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Blog review decision successfully reverted.",
    });
  } catch (error) {
    console.error("Error in reverting blog:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

/**==============================================
 * Update FlaggedPost review status
 * ==============================================*/
const updateFlaggedPostReviewStatus = async (flaggedPostId) => {
  try {
    const flaggedPost = await FlaggedPost.findById(flaggedPostId);
    if (flaggedPost.flagCount >= 5) {
      flaggedPost.reviewStatus = "under review";
      await flaggedPost.save();
    }
    console.log("Post has been automatically marked for review.");
  } catch (error) {
    console.error("Error in updating review status.", error);
  }
};

/**==============================================
 * Add moderator's note
 * ==============================================*/
const addModeratorNote = async (req, res) => {
  try {
    const { slug } = req.params;
    const { note } = req.body;

    const flaggedPost = await FlaggedPost.findOne({ flaggedSlug: slug });
    if (!flaggedPost)
      return res.status(404).json({ message: "Flagged post not found" });

    flaggedPost.moderatorNote = note;
    await flaggedPost.save();

    res.status(200).json({ message: "Moderator note added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error adding moderator note.", error });
  }
};

/**==============================================
 * Change review status
 * ==============================================*/
const changeReviewStatus = async (flaggedPostId, newStatus, reviewComment) => {
  try {
    const flaggedPost = await FlaggedPost.findById(flaggedPostId);
    flaggedPost.reviewStatus = newStatus;
    flaggedPost.reviewComment = reviewComment;
    await flaggedPost.save();
    console.log("Review status updated successfully.");
  } catch (error) {
    console.error("Error in updating review status.", error);
  }
};

/**==============================================
 * Rate limiting flagging
 * ==============================================*/
const rateLimitFlagging = async (userId) => {
  try {
    const recentFlags = await FlaggedPost.find({
      flaggedBy: userId,
      flaggedAt: { $gt: new Date(Date.now() - 60 * 60 * 1000) }, //One hour ago
    });
    if (recentFlags.length >= 3) {
      throw new Error("You have exceeded the flag limit for this hour.");
    }
    return true; //Allow flagging if within the limit
  } catch (error) {
    console.error("Error with rate limiting in flagging.", error);
    throw error;
  }
};

/**==============================================
 * Get Flagged post analytics
 * ==============================================*/
const getFlaggedPostAnalytics = async () => {
  try {
    // Aggregate the total number of flagged posts
    const totalFlags = await FlaggedPost.countDocuments();

    // Get the top 5 most flagged posts by flag count
    const topFlaggedPosts = await FlaggedPost.aggregate([
      { $group: { _id: "$postId", flagCount: { $sum: 1 } } },
      { $sort: { flagCount: -1 } },
      { $limit: 5 },
    ]);

    return { totalFlags, topFlaggedPosts };
  } catch (err) {
    console.error("Error getting flagged post analytics:", err);
    throw err;
  }
};

module.exports = {
  getFlaggedPosts,
  getFlaggedBlogBySlug,
  approveFlaggedBlog,
  rejectFlaggedBlog,
  revertFlaggedBlogStatus,
  updateFlaggedPostReviewStatus,
  addModeratorNote,
  changeReviewStatus,
  rateLimitFlagging,
  getFlaggedPostAnalytics,
  createAuditLog,
};
