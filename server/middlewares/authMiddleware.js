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

const isSuperAdmin =
  (requiredRoles = []) =>
  async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res
          .status(403)
          .json({ message: "Forbidden: User ID not found in token." });
      }

      // Fetch user data (including roles) from the database
      const user = await User.findById(req.user.id).populate("roles");

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Extract role names from populated roles
      const userRoleNames = user.roles.map((role) => role.name);

      // Check if the user has at least one of the required roles
      const hasRequiredRole =
        requiredRoles.length === 0 ||
        requiredRoles.some((requiredRole) =>
          userRoleNames.includes(requiredRole)
        );

      if (!hasRequiredRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions." });
      }

      req.user.roles = user.roles; // Attach user roles to the request for further use
      next();
    } catch (error) {
      console.error("Error verifying roles:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

module.exports = { verifyToken, isSuperAdmin };
