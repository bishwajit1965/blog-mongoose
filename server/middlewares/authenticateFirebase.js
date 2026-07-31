const admin = require("../config/firebaseAdmin");
const User = require("../models/User");

const authenticateFirebase = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing.",
      });
    }

    const idToken = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const user = await User.findOne({
      firebaseUid: decodedToken.uid,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Firebase Authentication Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid Firebase token.",
    });
  }
};

module.exports = authenticateFirebase;

// const admin = require("../config/firebaseAdmin");
// const User = require("../models/User");

// const authenticateFirebase = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization token missing.",
//       });
//     }

//     const idToken = authHeader.split(" ")[1];

//     const decoded = await admin.auth().verifyIdToken(idToken);

//     const user = await User.findOne({
//       firebaseUid: decoded.uid,
//     });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     console.error("Firebase Authentication Error:", error);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired Firebase token.",
//     });
//   }
// };

// module.exports = authenticateFirebase;
