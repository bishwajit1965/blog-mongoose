const express = require("express");

const router = express.Router();

const {
  fetchUserStats,
  fetchRecentUsers,
} = require("../controllers/adminStatsController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

// router.use(authenticateToken);

router.get("/users/stats", authorizeRoles(["super-admin"]), fetchUserStats);

router.get("/users/recent", authorizeRoles(["super-admin"]), fetchRecentUsers);

module.exports = router;
