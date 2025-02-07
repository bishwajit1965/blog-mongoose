const { verifyJWT } = require("../utils/jwt");
const User = require("../models/User"); // Assuming User is your model

const verifyAdminRoles =
  (requiredRoles = []) =>
  async (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token not found." });
    }
    try {
      // Decode JWT to get the user information (firebaseUid in this case)
      const decoded = verifyJWT(token);
      console.log("Decoded JWT:", decoded); // Debugging line

      // Fetch the user from the database based on the decoded firebaseUid
      const user = await User.findOne({
        firebaseUid: decoded.firebaseUid,
      }).populate({ path: "roles", select: "name" });

      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }

      // Check if the user has any of the required roles
      const userRoles = user.roles.map((role) => role.name);
      console.log("User roles:", userRoles); // Debugging
      console.log("Required roles:", requiredRoles); // Debugging

      const hasRole = requiredRoles.some((requiredRole) =>
        userRoles.includes(requiredRole.name)
      );

      if (!hasRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions." });
      }

      req.user = user; // Attach user data to the request
      next();
    } catch (error) {
      console.error("Error in verifying admin roles:", error);
      return res.status(403).json({ message: "Invalid or expired token." });
    }
  };

module.exports = { verifyAdminRoles };
