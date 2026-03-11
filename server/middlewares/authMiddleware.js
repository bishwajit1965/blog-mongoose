const { verifyJWT } = require("../utils/jwt");
const User = require("../models/User");

// Unified token verification middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.authToken;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    return res
      .status(403)
      .json({ message: "Unauthorized: Invalid or expired token." });
  }

  try {
    const user = await User.findById(decoded.id)
      .populate({
        path: "roles",
        select: "name permissions",
        populate: { path: "permissions", select: "name" },
      })
      .populate("permissions", "name");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Normalize roles & permissions
    const roles = user.roles.map((r) => r.name);
    const permissions = [
      ...new Set([
        ...user.permissions.map((p) => p.name),
        ...user.roles.flatMap((r) => r.permissions.map((p) => p.name)),
      ]),
    ];

    req.user = {
      id: user._id.toString(),
      email: user.email,
      roles,
      permissions,
    };

    next();
  } catch (error) {
    console.error("Error in verifyToken:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Role-based middleware using the same req.user signature
const isSuperAdmin =
  (requiredRoles = []) =>
  (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ message: "Forbidden: No roles assigned." });
    }

    const hasRole =
      requiredRoles.length === 0 ||
      requiredRoles.some((role) => req.user.roles.includes(role));

    if (!hasRole) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions." });
    }

    next();
  };

module.exports = { verifyToken, isSuperAdmin };

// const jwt = require("jsonwebtoken");
// const User = require("../models/User"); // Assuming you have a User model with roles stored

// // Middleware to verify the token
// const verifyToken = (req, res, next) => {
//   const token = req.cookies.authToken; // Extracting token from cookies (HTTP-only)

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized: No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded user info to the request object
//     next();
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return res.status(401).json({ message: "Unauthorized: Invalid token." });
//   }
// };

// const isSuperAdmin =
//   (requiredRoles = []) =>
//   async (req, res, next) => {
//     try {
//       if (!req.user || !req.user.id) {
//         return res
//           .status(403)
//           .json({ message: "Forbidden: User ID not found in token." });
//       }

//       // Fetch user data (including roles) from the database
//       const user = await User.findById(req.user.id).populate("roles");

//       if (!user) {
//         return res.status(404).json({ message: "User not found." });
//       }

//       // Extract role names from populated roles
//       const userRoleNames = user.roles.map((role) => role.name);

//       // Check if the user has at least one of the required roles
//       const hasRequiredRole =
//         requiredRoles.length === 0 ||
//         requiredRoles.some((requiredRole) =>
//           userRoleNames.includes(requiredRole),
//         );

//       if (!hasRequiredRole) {
//         return res
//           .status(403)
//           .json({ message: "Forbidden: Insufficient permissions." });
//       }

//       req.user.roles = user.roles; // Attach user roles to the request for further use
//       next();
//     } catch (error) {
//       console.error("Error verifying roles:", error);
//       res.status(500).json({ message: "Internal server error." });
//     }
//   };

// module.exports = { verifyToken, isSuperAdmin };
