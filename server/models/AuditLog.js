const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlaggedPost",
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: [
      "flagged",
      "review-approved",
      "review-rejected",
      "review-reverted",
      "moderator-note-added",
      "penalty-applied",
      "penalty-lifted",
    ],
  },
  moderatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  flaggedTitle: {
    type: String,
    required: true,
  },
  flaggedSlug: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    enum: [
      "Flagging grounded",
      "No violation found",
      "Needs more clarification",
      "Fact checked and approved",
      "Reviewed and approved",
      "Rejected due to policy violation",
      "needs further revision",
      "review flag reverted",
      "Approving - Violation confirmed.",
      "Approving - Inappropriate or harmful content.",
      "Approving - Educational or opinion-based content, acceptable as-is.",
      "Approving - Post contains spam.",
      "Approving - Offensive or abusive language.",
      "Approving - Misinformation or false claims",
      "Approving - Violates community guidelines",
      "Approving - Sensitive or disturbing content",
      "Approving - Content incites hate or violence",
      "Rejecting - No violation found.",
      "Rejecting - Content is appropriate.",
      "Rejecting - Flag lacks sufficient reason.",
      "Rejecting - Post complies with community guidelines.",
      "Rejecting - Misunderstanding — content is within acceptable limits.",
      "Rejecting - False or frivolous flag.",
      "Rejecting - No evidence of policy breach.",
      "Rejecting - Personal bias or disagreement detected",
      "Rejecting - Content violates community guidelines.",
    ],
    required: true, // Enforcing the comment to be provided
  },
  statusChange: {
    oldStatus: String,
    newStatus: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
