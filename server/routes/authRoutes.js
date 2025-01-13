const express = require("express");

const { registerOrLoginUser } = require("../controllers/authController");
const { verifyRoles } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/auth/register", registerOrLoginUser);

router.get("/admin-only", verifyRoles(["admin"]), (req, res) => {
  res.status(200).json({ message: "Welcome! admin" });
});

module.exports = router;
