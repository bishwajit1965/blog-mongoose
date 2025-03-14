const express = require("express");
const router = express.Router();

const { getBlogStatus } = require("../controllers/blogStatusController");

router.get("/blog-status", getBlogStatus);

module.exports = router;
