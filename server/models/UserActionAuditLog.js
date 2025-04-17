const mongoose = require("mongoose");

const userActionAuditLogSchema = new mongoose.Schema({
  // User-related fields for ban/unban
  affectedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Required for user-related actions like ban/unban
  },

  // Post-related fields for flagged posts
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlaggedPost",
    required: false, // Optional for non-post actions
  },
  flaggedTitle: {
    type: String,
    required: false, // Optional for non-flagged actions
  },
  flaggedSlug: {
    type: String,
    required: false, // Optional for non-flagged actions
  },

  // Action performed (e.g., ban/unban, review approved/rejected, etc.)
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
      "user-banned",
      "user-unbanned",
    ],
  },
  moderatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Who performed the action (moderator)
  },

  // Optional comment related to the action
  comment: {
    type: String,
    required: false, // Optional field for comments in some actions
  },

  statusChange: {
    oldStatus: String,
    newStatus: String,
  },

  timestamp: {
    type: Date,
    default: Date.now, // Automatically set timestamp on creation
  },
});

module.exports = mongoose.model("UserActionAuditLog", userActionAuditLogSchema);
