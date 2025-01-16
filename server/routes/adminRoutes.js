const express = require("express");
const { loginAdmin, logoutAdmin } = require("../controllers/adminController");
const { verifyJWT } = require("../utils/jwt");
const { verifyAdminRoles } = require("../middlewares/verifyAdminRoles");

const router = express.Router();

router.post("/login", loginAdmin); // Admin login
router.post("/logout", logoutAdmin); // Admin logout

// Middleware to verify token for all routes
router.use((req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    res.status(401).json({ message: "Unauthorized!" });
  }
  try {
    const user = verifyJWT(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
});

// Admin-only routes
router.use("/admin", verifyAdminRoles(["admin"]));
router.get("/admin/admin-home-dashboard", (req, res) => {
  res.status(200).json({ message: "Welcome to the admin dashboard!" });
});

// Editor-only routes
router.use("/editor", verifyAdminRoles(["editor", "admin"]));
router.get("/editor/dashboard", (req, res) => {
  res.status(200).json({ message: "Welcome to editor dashboard!" });
});

// Writer-only routes
router.use("/writer", verifyAdminRoles(["writer", "admin"]));
router.get("/writer/dashboard", (req, res) => {
  res.status(200).json({ message: "Welcome to writer dashboard!" });
});

// Admin details route for auth state persistence(is a must)
router.get("/me", (req, res) => {
  try {
    const token = req.cookies.authToken; // Get token from cookies
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found." });
    }

    const user = verifyJWT(token); // Decode and verify token
    res.status(200).json(user); // Send user details back
  } catch (error) {
    res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token." });
  }
});

// Example of a protected admin-only route(Is a must)
router.get(
  "/protected",
  (req, res, next) => {
    // Middleware to verify JWT
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found." });
    }
    try {
      req.user = verifyJWT(token);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
  },
  verifyAdminRoles(["admin"]),
  (req, res) => {
    res.status(200).json({ message: "You have access to this route." });
  }
);

module.exports = router;
