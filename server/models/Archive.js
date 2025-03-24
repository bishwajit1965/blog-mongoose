const mongoose = require("mongoose");

// =============================
// Blog Schema (Active Posts)
// =============================
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    content: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true },
    ],
    status: {
      type: String,
      required: true,
      enum: [
        "draft",
        "published",
        "scheduled",
        "publishAt",
        "coming-soon",
        "deleted",
        "archived",
      ],
      default: "draft",
    },
    publishAt: { type: Date, default: null },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String, default: null },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: [String], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// =============================
// Archived Blog Schema
// =============================
const ArchivedBlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    content: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true },
    ],
    publishAt: { type: Date, default: null },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "draft",
        "published",
        "scheduled",
        "coming-soon",
        "deleted",
        "archived",
      ],
      default: "archived",
    },
    image: { type: String, default: null },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: {
      type: [String],
      default: function () {
        return [];
      },
    },
    archivedAt: { type: Date, required: true },
    originalId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// =============================
// Prevent Overwriting Models
// =============================

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
const ArchivedBlog =
  mongoose.models.ArchivedBlog ||
  mongoose.model("ArchivedBlog", ArchivedBlogSchema);

// =============================
// Archive Service Functions
// =============================

/**
 * Archive a blog post by moving it from Blog collection to ArchivedBlog collection
 * @param {string} slug - Slug of the blog to archive
 * @returns {Promise<Object>} - The archived blog post
 */
const archiveBlog = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    console.log("Blog found:", blog); // ✅ Debugging

    const archivedBlog = new ArchivedBlog({
      ...blog.toObject(),
      originalId: blog._id,
      archivedAt: new Date(),
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await archivedBlog.save({ session }); // ✅ Save archive first
      await Blog.deleteOne({ _id: blog._id }, { session }); // ✅ Then delete original

      await session.commitTransaction();
      session.endSession();

      return res
        .status(200)
        .json({ message: "Blog archived successfully", archivedBlog });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error during transaction:", err);
      return res
        .status(500)
        .json({ message: "Error archiving blog", error: err.message });
    }
  } catch (err) {
    console.error("Archive error:", err);
    return res
      .status(500)
      .json({ message: "Error archiving blog", error: err.message });
  }
};

/**
 * Restore an archived blog post back to the active Blog collection
 * @param {string} slug - Slug of the blog to restore
 * @returns {Promise<Object>} - The restored blog post
 */
const restoreBlog = async (slug) => {
  const archivedBlog = await ArchivedBlog.findOne({ slug });
  if (!archivedBlog) throw new Error("Archived blog not found");

  const restoredBlog = new Blog({
    ...archivedBlog.toObject(),
    _id: archivedBlog.originalId, // Restore original ID
  });

  await restoredBlog.save();
  await ArchivedBlog.findByIdAndDelete(archivedBlog._id); // Remove from archive

  return restoredBlog;
};

/**
 * Permanently delete an archived blog post
 * @param {string} slug - Slug of the blog to delete permanently
 * @returns {Promise<Object>} - Deletion confirmation
 */
const deleteArchivedBlog = async (slug) => {
  const archivedBlog = await ArchivedBlog.findOne({ slug });
  if (!archivedBlog) throw new Error("Archived blog not found");

  await ArchivedBlog.findByIdAndDelete(archivedBlog._id);
  return { message: "Archived blog deleted permanently" };
};

// =============================
// Export Archive Functions
// =============================

module.exports = {
  Blog,
  ArchivedBlog,
  archiveBlog,
  restoreBlog,
  deleteArchivedBlog,
};
