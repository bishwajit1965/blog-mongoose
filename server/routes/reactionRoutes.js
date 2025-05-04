const express = require("express");
const router = express.Router();

const {
  reactToPost,
  getReactionsForPost,
} = require("../controllers/reactionController");

const { authenticateToken } = require("../middlewares/authenticateToken");

router.post("/react/:slug", authenticateToken, reactToPost);
router.get("/counts/:slug", getReactionsForPost);

module.exports = router;
