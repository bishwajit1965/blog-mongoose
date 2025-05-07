const Bookmark = require("../models/Bookmark");
const Blog = require("../models/Blog");

// ✅ Add a blog post to bookmarks
const bookMarkPost = async (req, res) => {
  const userId = req.user.id;
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId).select("slug");
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Prevent duplicate bookmark (unique index exists on userId + blogId)
    const alreadyBookmarked = await Bookmark.findOne({ userId, blogId });
    if (alreadyBookmarked) {
      return res
        .status(400)
        .json({ success: false, message: "Already bookmarked." });
    }

    const newBookmark = new Bookmark({ userId, blogId, slug: blog.slug });
    await newBookmark.save();

    res
      .status(200)
      .json({ success: true, message: "Post bookmarked successfully!" });
  } catch (error) {
    console.error("Bookmark error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while bookmarking.",
    });
  }
};

// ✅ Remove a blog post from bookmarks
const removeBookmark = async (req, res) => {
  const userId = req.user.id;
  const { blogId } = req.params;

  try {
    const deleted = await Bookmark.findOneAndDelete({ userId, blogId });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Bookmark not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Bookmark removed successfully!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while removing bookmark.",
    });
  }
};

// ✅ Get all bookmarked posts of a user
const getAllBookmarkedPost = async (req, res) => {
  const userId = req.user.id;

  try {
    const bookmarks = await Bookmark.find({ userId }).populate({
      path: "blogId",
      select:
        "title slug content excerpt category tags image author publishAt createdAt",
      populate: [
        { path: "author", select: "name email avatar" },
        { path: "category", select: "name" },
        { path: "tags", select: "name" },
      ],
    });

    const posts = bookmarks.map((b) => {
      const blog = b.blogId?.toObject(); // convert Mongoose doc to plain object
      if (blog) {
        blog.bookmarkedAt = b.bookmarkedAt; // flatten it
      }
      return blog;
    });
    res.status(200).json({ success: true, bookmarks: posts });
  } catch (error) {
    console.error("Fetch bookmarks error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching bookmarks.",
    });
  }
};

module.exports = {
  bookMarkPost,
  removeBookmark,
  getAllBookmarkedPost,
};
