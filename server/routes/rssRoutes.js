const express = require("express");

const { generateRSSFeed } = require("../controllers/rssController");

const router = express.Router();

router.get("/", generateRSSFeed);

module.exports = router;
