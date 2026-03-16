// const { verifyJWT } = require("../utils/jwt");
// const User = require("../models/User");

// // Unified token verification middleware
// const verifyToken = async (req, res, next) => {
//   const token = req.cookies?.authToken;
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized: No token provided." });
//   }

//   const decoded = verifyJWT(token);
//   if (!decoded) {
//     return res
//       .status(403)
//       .json({ message: "Unauthorized: Invalid or expired token." });
//   }

//   try {
//     const user = await User.findById(decoded.id)
//       .populate({
//         path: "roles",
//         select: "name permissions",
//         populate: { path: "permissions", select: "name" },
//       })
//       .populate("permissions", "name");

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Normalize roles & permissions
//     const roles = user.roles.map((r) => r.name);
//     const permissions = [
//       ...new Set([
//         ...user.permissions.map((p) => p.name),
//         ...user.roles.flatMap((r) => r.permissions.map((p) => p.name)),
//       ]),
//     ];

//     req.user = {
//       id: user._id.toString(),
//       email: user.email,
//       roles,
//       permissions,
//     };

//     next();
//   } catch (error) {
//     console.error("Error in verifyToken:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

// // Role-based middleware using the same req.user signature
// const isSuperAdmin =
//   (requiredRoles = []) =>
//   (req, res, next) => {
//     if (!req.user || !req.user.roles) {
//       return res.status(403).json({ message: "Forbidden: No roles assigned." });
//     }

//     const hasRole =
//       requiredRoles.length === 0 ||
//       requiredRoles.some((role) => req.user.roles.includes(role));

//     if (!hasRole) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: Insufficient permissions." });
//     }

//     next();
//   };

// module.exports = { verifyToken, isSuperAdmin };
