const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
      index: true,
    },
    slug: { type: String },
    bookmarkedAt: {
      type: Date,
      default: Date.now,
    },
    // Optional features for future use:
    folder: { type: String }, // e.g., "Tech", "Favorites"
    notes: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Prevent duplicate bookmarks by same user on same blog
BookmarkSchema.index({ userId: 1, blogId: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", BookmarkSchema);
