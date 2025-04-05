const mongoose = require("mongoose");

const FlaggedPostSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    flaggedSlug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    flaggedBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    flaggedReason: {
      type: [String],
      enum: [
        "Inappropriate content",
        "Spam",
        "Offensive language",
        "Misinformation",
        "Other",
      ],
      default: ["Other"],
      required: true,
    },
    flaggedAt: { type: [Date], default: () => [new Date()] },
    lastFlaggedAt: { type: Date },

    // ✅ Review and moderation fields
    reviewStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
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
      ],
      default: "none",
    },
    reviewHistory: [
      {
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
