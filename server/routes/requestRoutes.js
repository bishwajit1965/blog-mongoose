const express = require("express");

const router = express.Router();
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

const { createRequest } = require("../controllers/requestController");

router.post("/message", authenticateToken, createRequest);

module.exports = router;
