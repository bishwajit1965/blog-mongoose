const mongoose = require("mongoose");
const { Blog, ArchivedBlog } = require("../models/Archive");

// ==============================
// Archive a blog
// ==============================
const archiveBlog = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Remove `_id` and `__v` before copying
    const { _id, __v, ...blogData } = blog.toObject();

    // Creating an archived copy
    const archivedBlog = new ArchivedBlog({
      ...blogData,
      originalId: _id,
      status: "archived",
      archivedAt: new Date(),
    });

    // Transaction session
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await archivedBlog.save({ session });
      await Blog.findByIdAndDelete(_id, { session });
      await session.commitTransaction();
      session.endSession();
      return res
        .status(200)
        .json({ message: "Blog archived successfully", archivedBlog });
    } catch (err) {
      console.error("❌ Transaction Error:", err.message);
      await session.abortTransaction();
      session.endSession();
      return res
        .status(500)
        .json({ message: "Error archiving blog", error: err.message });
    }
  } catch (err) {
    console.error("❌ Archive error:", err.message);
    return res
      .status(500)
      .json({ message: "Error archiving blog", error: err.message });
  }
};

// ==============================
// Get archived blog by slug
// ==============================
const getArchivedBlogBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await ArchivedBlog.findOne({ slug }).populate(
      "author",
      "name email"
    );
    if (!blog)
      return res.status(404).json({ message: "Archived blog not found." });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Get all archived blogs (Pagination)
// ==============================
const getAllArchivedBlogs = async (req, res) => {
  try {
    const blogs = await ArchivedBlog.find({ status: "archived" })
      .populate("author", "name email")
      .populate("category", "name")
      .populate("tags", "name")
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Restore archived blog
// ==============================
const restoreArchivedBlog = async (req, res) => {
  const { slug } = req.params;
  try {
    const archivedBlog = await ArchivedBlog.findOne({ slug });
    if (!archivedBlog)
      return res.status(404).json({ message: "Archived blog not found" });

    // Prepare restored blog data
    const restoredBlogData = {
      ...archivedBlog.toObject({ getters: true, versionKey: false }),
      _id: archivedBlog.originalId || new mongoose.Types.ObjectId(), // Use originalId or generate a new one
      status: "published", // Change the status to 'published'
      archivedAt: undefined, // Remove the archived timestamp
    };

    // Start a session for the transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Create a new blog instance from the archived blog data
      const restoredBlog = new Blog(restoredBlogData);
      await restoredBlog.save({ session }); // Save the restored blog in the Blog collection

      // Remove the archived blog
      await ArchivedBlog.findByIdAndDelete(archivedBlog._id, { session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Respond with success message
      res
        .status(200)
        .json({ message: "Blog restored successfully", restoredBlog });
    } catch (err) {
      // Abort transaction in case of an error
      await session.abortTransaction();
      session.endSession();
      return res
        .status(500)
        .json({ message: "Error restoring blog", error: err.message });
    }
  } catch (error) {
    console.error("Error in restoreArchivedBlog:", error); // Detailed error log
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Delete archived blog permanently
// ==============================
const softDeleteArchivedBlog = async (req, res) => {
  const { slug } = req.params;
  try {
    const archivedBlog = await ArchivedBlog.findOne({ slug });
    if (!archivedBlog)
      return res.status(404).json({ message: "Archived blog not found" });

    // Prepare the data for the blog to be moved to the blogs collection
    const blogData = {
      ...archivedBlog.toObject({ getters: true, versionKey: false }),
      status: "deleted", // Mark as deleted
      deletedAt: new Date(), // Optionally add a deleted date
    };

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create a new blog in the blogs collection with status "deleted"
      const deletedBlog = new Blog(blogData);
      await deletedBlog.save({ session });

      // Delete the archived blog
      await ArchivedBlog.findByIdAndDelete(archivedBlog._id, { session });

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        message: "Archived blog soft deleted and moved to blogs collection",
        deletedBlog,
      });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({
        message: "Error soft deleting archived blog",
        error: err.message,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Export controllers
// ==============================
module.exports = {
  archiveBlog,
  getArchivedBlogBySlug,
  getAllArchivedBlogs,
  restoreArchivedBlog,
  softDeleteArchivedBlog,
};
