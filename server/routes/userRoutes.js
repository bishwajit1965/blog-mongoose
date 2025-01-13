const express = require("express");

const { createUser } = require("../controllers/userController");

const router = express.Router();

// Route for user data insertion
router.post("/auth/register", createUser);

module.exports = router;
