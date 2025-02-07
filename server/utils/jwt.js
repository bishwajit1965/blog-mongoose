const jwt = require("jsonwebtoken");

const generateJWT = (payload) => {
  if (!payload || typeof payload !== "object") {
    console.error("Invalid payload for JWT generation");
    return null;
  }
  try {
    return jwt.sign(payload, process.env.JWT_SECRET || "default_secret", {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
  } catch (error) {
    console.error("JWT generation failed:", error.message);
    return null;
  }
};

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT verification failed", error);
    return null; // Return null if verification fails
  }
};

module.exports = { generateJWT, verifyJWT };
