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
