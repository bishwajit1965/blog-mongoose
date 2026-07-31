const express = require("express");

const router = express.Router();

const {
  getAuthorFollowStatus,
} = require("../controllers/publicAuthorFollowStatusController");

router.use((req, res, next) => {
  console.log("PUBLIC FOLLOW ROUTE HIT");
  next();
});

const authenticateFirebase = require("../middlewares/authenticateFirebase");

router.get(
  "/follow-status/:authorId",
  authenticateFirebase,
  getAuthorFollowStatus,
);

module.exports = router;
