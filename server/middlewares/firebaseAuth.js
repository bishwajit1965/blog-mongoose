const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("🔥 Firebase Admin initialized!!!");
}

const firebaseAuth = async (req, res, next) => {
  console.log("REQ HEADERS:", req.headers);

  console.log("✅ Reached firebase auth");

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access attempt. No token provided!",
    });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    next();
  } catch (err) {
    console.error("Firebase Auth error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized access attempt. Invalid token!",
    });
  }
};

module.exports = { firebaseAuth };
