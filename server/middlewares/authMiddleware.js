const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming you have a User model with roles stored

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken; // Extracting token from cookies (HTTP-only)

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request object
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};

// Middleware to check if the user is a super admin
const isSuperAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: User ID not found in token." });
    }

    const user = await User.findById(req.user.id); // Fetch user from database

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.roles.includes("admin")) {
      return res.status(403).json({
        message: "Forbidden: You do not have super-admin privileges.",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking super-admin role:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { verifyToken, isSuperAdmin };
