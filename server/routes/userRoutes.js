const express = require("express");
const User = require("../models/User");

const {
  createUser,
  getUserById,
  banUser,
  unbanUser,
} = require("../controllers/userController");

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

const router = express.Router();

// Route for user data insertion
router.post("/register", createUser);

// Verifies token of all routes those
router.use(authenticateToken);

router.post(
  "/ban/:id",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["ban-flagging-post"]),
  banUser
);
router.post(
  "/unban/:id",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["ban-flagging-post"]),
  unbanUser
);

//NOTE:  UPDATE USER IS MANAGED BY userManagementController.js

//NOTE:  DELETE USER IS MANAGED BY userManagementController.js

module.exports = router;
