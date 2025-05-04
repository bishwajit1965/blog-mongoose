const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: {
      type: String,
      required: [true, "Comment Content is required."],
      trim: true,
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    level: { type: Number, default: 0, min: 0, max: 2 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewHistory: [
      {
        status: { type: String, enum: ["pending", "approved", "rejected"] },
        reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reviewComment: { type: String },
        reviewedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
