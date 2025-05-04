const mongoose = require("mongoose");

const FlaggedPostSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    flaggedTitle: {
      type: String,
      required: true,
      trim: true,
    },
    flaggedSlug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    flagCount: { type: Number, default: 1 },
    flaggedBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    flaggedReason: {
      type: [String],
      enum: [
        "Spam",
        "Offensive Content",
        "Inappropriate content",
        "Offensive language",
        "Misinformation",
        "Misleading Information",
        "Harassment",
        "Other",
      ],
      default: ["Other"],
      required: true,
    },
    flaggedAt: { type: [Date], default: () => [new Date()] },
    lastFlaggedAt: { type: Date },
    statusHistory: [
      {
        status: {
          type: String,
          enum: ["pending", "approved", "rejected", "reverted"],
          default: "pending",
        },
        statusChange: {
          oldStatus: String,
          newStatus: String,
        },
        changedAt: { type: Date, default: Date.now },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    moderatorNote: { type: String, default: "" },
    isArchived: { type: Boolean, default: false },

    // ✅ Review and moderation fields
    reviewStatus: {
      type: String,
      enum: ["pending", "approved", "rejected", "reverted"],
      default: "pending",
    },
    reviewComment: {
      type: String,
      enum: [
        "verified",
        "approved",
        "rejected",
        "reviewed",
        "none",
        "fact-checked",
        "flagging grounded",
        "authentic",
        "accurate",
        "no violation",
        "no violation found",
        "compliant",
        "suitable for publication",
        "violates guidelines",
        "inappropriate content",
        "inappropriate flag",
        "spam",
        "misleading",
        "offensive",
        "hate speech",
        "violence",
        "explicit content",
        "under review",
        "pending review",
        "awaiting further action",
        "no issue found",
        "under investigation",
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
      default: "none",
    },

    reviewHistory: [
      {
        status: {
          type: String,
          enum: ["approved", "rejected", "reverted"],
          required: true,
        },
        statusChange: {
          oldStatus: String,
          newStatus: String,
        },
        comment: { type: String, required: true },
        reviewedAt: { type: Date, default: Date.now },
        reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewedAt: { type: [Date], default: [] }, // empty array by default
    // ✅ False flagging and penalties
    isFalseFlag: { type: Boolean, default: false },
    falseFlagCount: { type: Number, default: 0 },

    // ✅Flagging penalty status for guideline violation
    penaltyStatus: {
      type: String,
      enum: ["none", "temporary-ban", "permanent-ban"],
      default: "none",
    },
    penaltyExpiresAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FlaggedPost", FlaggedPostSchema);
