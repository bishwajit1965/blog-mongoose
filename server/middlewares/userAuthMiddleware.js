// const jwt = require("jsonwebtoken");

// const userAuthMiddleware = (req, res, next) => {
//   const token = req.cookies.authToken;
//   if (!token) {
//     return res.status(401).json({ message: "No token is provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded JWT in userAuthMiddleware TESTING!!!!!:", decoded);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid or expired token." });
//   }
// };

// module.exports = userAuthMiddleware;
