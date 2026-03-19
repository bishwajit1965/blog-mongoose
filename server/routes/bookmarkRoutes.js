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

// const { authenticateToken } = require( "../middlewares/authenticateToken" );

const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

// router.get("/get-bookmarks", getAllBookmarkedPost);

router.use(authenticateUser);

router.get("/get-bookmarks", getAllBookmarkedPost);

router.post("/bookmark/:blogId", validateBlogId, bookMarkPost);

router.delete("/remove-bookmark/:blogId", validateBlogId, removeBookmark);

module.exports = router;
