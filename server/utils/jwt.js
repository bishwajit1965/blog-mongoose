const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateJWT = (payload, secretType = "access") => {
  if (!payload || typeof payload !== "object") {
    console.error("Invalid payload for JWT generation");
    return null;
  }
  const secret =
    secretType === "refresh"
      ? process.env.JWT_REFRESH_SECRET
      : process.env.JWT_SECRET;

  const expiresIn =
    secretType === "refresh"
      ? process.env.JWT_REFRESH_EXPIRES_IN
      : process.env.JWT_ACCESS_EXPIRES_IN;

  try {
    return jwt.sign(payload, secret, { expiresIn });
  } catch (error) {
    console.error("JWT generation failed:", error.message);
    return null;
  }
};

const verifyJWT = (token, secretType = "access") => {
  const secret =
    secretType === "refresh"
      ? process.env.JWT_REFRESH_SECRET
      : process.env.JWT_SECRET;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log(`❌ JWT Verification Failed (${type}):`, err.message);
    // console.error("JWT verification failed", error);
    return null; // Return null if verification fails
  }
};

module.exports = { generateJWT, verifyJWT };
