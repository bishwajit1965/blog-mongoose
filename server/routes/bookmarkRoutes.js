const express = require("express");
const mongoose = require("mongoose");

const {
  bookMarkPost,
  removeBookmark,
  getAllBookmarkedPost,
} = require("../controllers/bookMarkController");

const validateBlogId = (req, res, next) => {
  const { blogId } = req.params;
  if (blogId && !mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ success: false, message: "Invalid blog ID" });
  }
  next();
};

const { authenticateToken } = require("../middlewares/authenticateToken");

const router = express.Router();

router.use(authenticateToken);

router.post("/bookmark/:blogId", validateBlogId, bookMarkPost);

router.get("/get-bookmarks", getAllBookmarkedPost);

router.delete("/remove-bookmark/:blogId", validateBlogId, removeBookmark);

module.exports = router;
