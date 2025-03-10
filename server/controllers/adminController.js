const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../utils/jwt");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const User = require("../models/User");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Request body:", req.body);

  try {
    // Input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email })
      .populate({ path: "roles", select: "name" })
      .populate({ path: "permissions", select: "name" });
    console.log("User data", user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Verify the password
    if (password && user.password) {
      console.log("Entered password:", password);
      console.log("Stored hashed password:", user.password);
      const isMatched = await bcrypt.compare(password, user.password);
      console.log("Password match result:", isMatched);
      if (!isMatched) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
    }

    const payload = {
      id: user._id,
      email: user.email,
      roles: user.roles.map((role) => role.name),
      permissions: user.permissions.map((permission) => permission.name),
    };
    console.log("Payload for JWT:", payload);
    // Generate JWT
    const token = generateJWT(payload);
    console.log("Generated JWT:", token);
    // Set HTTP-only cookie
    res
      .cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "Strict",
        maxAge: 3600000, // 1 hour
      })
      .status(200)
      .json({
        message: "Login is successful!",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          roles: user.roles,
          permissions: user.permissions,
        },
      });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// const updateAdminUserRolesAndPermissions = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { roles = [], permissions = [] } = req.body;

//     // Validate if userId is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid user ID format" });
//     }

//     console.log("Roles request for update:", roles);
//     console.log("Permissions request for update:", permissions);
//     console.log("Request body:", req.body);

//     // Fetch existing roles and permissions in parallel
//     const [validRoles, validPermissions] = await Promise.all([
//       Role.find({ _id: { $in: roles } }),
//       Permission.find({ _id: { $in: permissions } }),
//     ]);

//     // Ensure roles and permissions exist before updating
//     if (roles.length && validRoles.length !== roles.length) {
//       return res.status(400).json({ message: "One or more roles are invalid" });
//     }
//     if (permissions.length && validPermissions.length !== permissions.length) {
//       return res
//         .status(400)
//         .json({ message: "One or more permissions are invalid" });
//     }

//     // Check if the user exists before updating
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update the user
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         roles: validRoles.map((role) => role._id),
//         permissions: validPermissions.map((permission) => permission._id),
//       },
//       { new: true }
//     )
//       .populate("roles", "name")
//       .populate("permissions", "name")
//       .lean();

//     res.status(200).json({ message: "User updated successfully", updatedUser });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res
//       .status(500)
//       .json({ message: "Error updating user", error: error.message });
//   }
// };

const logoutAdmin = (req, res) => {
  // Clear the authentication cookie
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logout successful." });
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  loginAdmin,
  // updateAdminUserRolesAndPermissions,
  logoutAdmin,
  deleteUser,
};
