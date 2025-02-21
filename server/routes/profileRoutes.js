const express = require("express");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

const {
  getAllProfiles,
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

const router = express.Router();

// Verifies token of all routes those
router.use(authenticateToken);

router.get(
  "/",
  authorizeRoles(["super-admin", "editor", "user"]),
  getAllProfiles
);

router.get(
  "/:id",
  authorizeRoles(["super-admin", "editor", "user"]),
  getProfile
);

router.patch(
  "/:id",
  authorizeRoles(["super-admin", "admin", "editor", "user"]),
  updateProfile
);

module.exports = router;
