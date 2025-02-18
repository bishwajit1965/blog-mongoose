const { verifyJWT } = require("../utils/jwt");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;
  console.log("Token in admin:", token);
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized access attempt. No token provided!",
    });
  }
  try {
    const decoded = verifyJWT(token);
    console.log("Decoded data:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ status: "error", message: "Invalid or expired token." });
  }
};

// Role-based access control middleware
const authorizeRoles =
  (requiredRoles = []) =>
  (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({
        status: "error",
        message: "Access denied. No roles assigned.",
      });
    }

    // Check if the user has at least one of the required roles
    const hasRole = requiredRoles.some((role) => req.user.roles.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        status: "error",
        message: "Access denied. Insufficient permissions.",
      });
    }

    next();
  };

module.exports = { authenticateToken, authorizeRoles };
