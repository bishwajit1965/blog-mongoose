const express = require("express");

const { getPublicPageBySlug } = require("../controllers/publicPageController");

const router = express.Router();

router.get("/:slug", getPublicPageBySlug);

module.exports = router;
