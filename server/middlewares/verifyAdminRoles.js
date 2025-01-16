const { verifyJWT } = require("../utils/jwt");

const verifyAdminRoles = (roles) => (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token not found." });
  }
  try {
    const user = verifyJWT(token);
    console.log("Decoded JWT:", user); // Check the decoded token and roles

    if (!roles.some((role) => user.roles.includes(role))) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions." });
    }
    req.user = user; // Attach user data to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = { verifyAdminRoles };
