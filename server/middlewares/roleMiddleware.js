const { verifyJWT } = require("../helpers/jwtHelpers");

const verifyRoles = (roles) => (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token not found." });
  }
  try {
    const user = verifyJWT(token);
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

module.exports = { verifyRoles };
