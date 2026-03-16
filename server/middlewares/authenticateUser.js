const admin = require("firebase-admin");
const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    // ✅ Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    // ✅ Find the corresponding Mongo user
    const user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = {
      id: user._id, // MongoDB ObjectId
      firebaseUid: decoded.uid,
      role: user.roles,
    };

    next();
  } catch (error) {
    console.error("User auth error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticateUser;
