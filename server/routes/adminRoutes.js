const express = require("express");
const { loginAdmin, logoutAdmin } = require("../controllers/adminController");
const { verifyAdminRoles } = require("../middlewares/verifyAdminRoles");
const User = require("../models/User");
const { authenticateToken } = require("../middlewares/authenticate");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.use(authenticateToken);

// Admin details route for auth state persistence(is a must)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    // Fetch the user and populate roles with their names
    const user = await User.findById(req.user.id)
      .populate("roles", "name") // Populate roles with their names
      .populate("permissions", "name"); // Populate permissions with their names

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    // const roles = user.roles;
    res.status(200).json({ user }); // Send user details back
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized: Invalid or expired token.",
    });
  }
});

// Admin-only routes
router.use("/admin", verifyAdminRoles(["admin"]));

router.get("/admin/admin-home-dashboard", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to the admin dashboard!" });
});

// Editor-only routes
router.use("/editor", verifyAdminRoles(["editor", "admin"]));
router.get("/editor/dashboard", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to editor dashboard!" });
});

// Writer-only routes
router.use("/writer", verifyAdminRoles(["writer", "admin"]));
router.get("/writer/dashboard", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to writer dashboard!" });
});

// Example of a protected admin-only route(Is a must)
router.get("/protected", verifyAdminRoles(["admin"]), (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "You have access to this route." });
});

module.exports = router;
