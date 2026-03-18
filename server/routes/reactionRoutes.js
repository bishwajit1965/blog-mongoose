const express = require("express");
const router = express.Router();

const {
  reactToPost,
  getReactionsForPost,
} = require("../controllers/reactionController");

const authenticateUser = require("../middlewares/authenticateUser");

router.post("/react/:slug", authenticateUser, reactToPost);
router.get("/counts/:slug", getReactionsForPost);

module.exports = router;
