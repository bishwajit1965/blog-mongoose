const express = require("express");

const router = express.Router();

const {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const { authenticateToken } = require("../middlewares/authenticateToken");

router.get("/counts/:slug", getComments);

// Verify authentication
router.use(authenticateToken);

router.post("/comment/:slug", addComment);

router.patch("/edit-comment/:id", updateComment);

router.delete("/delete-comment/:id", deleteComment);

module.exports = router;
