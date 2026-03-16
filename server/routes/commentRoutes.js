const express = require("express");

const router = express.Router();

const {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const authenticateUser = require("../middlewares/authenticateUser");

router.get("/counts/:slug", getComments);

// Verify authentication
router.use(authenticateUser);

router.post("/comment/:slug", addComment);

router.patch("/edit-comment/:id", updateComment);

router.delete("/delete-comment/:id", deleteComment);

module.exports = router;
