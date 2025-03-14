const express = require("express");
const User = require("../models/User");

const { createUser } = require("../controllers/userController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

const router = express.Router();

// Route for user data insertion
router.post("/register", createUser);

// Verifies token of all routes those
router.use(authenticateToken);

//NOTE:  UPDATE USER IS MANAGED BY userManagementController.js

//NOTE:  DELETE USER IS MANAGED BY userManagementController.js

module.exports = router;
