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

    // ✅ Review and moderation fields
    reviewStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewComment: {
      type: String,
      enum: ["verified", "approved", "rejected", "reviewed", "none"],
      default: "reviewed",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewedAt: { type: [Date], default: () => [new Date()] },

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
