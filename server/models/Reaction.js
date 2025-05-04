const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    type: { type: String, enum: ["like", "dislike"], required: true },
  },
  { timestamps: true }
);

// Prevent multiple reactions of the same user on the same post
reactionSchema.index({ user: 1, blogPost: 1 }, { unique: true });

module.exports = mongoose.model("Reaction", reactionSchema);
