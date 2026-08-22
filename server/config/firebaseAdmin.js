const admin = require("firebase-admin");

const env = process.env;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
  console.log("🔥 Firebase Admin initialized");
}

module.exports = admin;

// var admin = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// console.log("🔥 Firebase Admin initialized");
// module.exports = admin;
