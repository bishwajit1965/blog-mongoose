const { verifyJWT } = require("../utils/jwt");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;
  console.log("Token in admin:", token);
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized access attempt." });
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

module.exports = { authenticateToken };
