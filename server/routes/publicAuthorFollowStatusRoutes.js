const express = require("express");

const router = express.Router();

const {
  getAuthorFollowStatus,
} = require("../controllers/publicAuthorFollowStatusController");
const { authenticateToken } = require("../middlewares/authenticateToken");

router.use(authenticateToken);

router.get("/follow-status/:authorId", getAuthorFollowStatus);

module.exports = router;
