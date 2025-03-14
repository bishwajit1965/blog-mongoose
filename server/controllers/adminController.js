const User = require("../models/User");

const bcrypt = require("bcrypt");
const { generateJWT, verifyJWT } = require("../utils/jwt");

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
    const token = generateJWT(payload, "access");
    const refreshToken = generateJWT(payload, "refresh");
    console.log("Generated JWT:", token);

    // Set cookies with secure handling for different environments
    const isProduction = process.env.NODE_ENV === "production";
    // Set HTTP-only cookie
    res
      .cookie("authToken", token, {
        httpOnly: true,
        secure: isProduction, // Use secure cookies in production
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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

const refreshAccessToken = async (req, res) => {
  try {
    console.log("🍪 Received Cookies:", req.cookies);
    const refreshToken = req.cookies.refreshToken; // Read token from cookies

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    // Verify JWT
    const decoded = verifyJWT(refreshToken, "refresh");
    if (!decoded) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    if (decoded.expired) {
      return res
        .status(401)
        .json({ message: "Refresh token expired, please log in again" });
    }

    // Find user and populate roles/permissions
    const user = await User.findById(decoded.id)
      .populate("roles", "name") // Fetch role names instead of ObjectIds
      .populate("permissions", "name"); // Fetch permission names

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Convert roles and permissions from objects to arrays of strings
    const userRoles = user.roles.map((role) => role.name);
    const userPermissions = user.permissions.map(
      (permission) => permission.name
    );

    // Generate new access token with correct role/permission format
    const newAccessToken = generateJWT(
      {
        id: user._id,
        email: user.email,
        roles: userRoles, // Now contains role names instead of ObjectIds
        permissions: userPermissions, // Now contains permission names instead of ObjectIds
      },
      "access"
    );

    // Set new access token in cookie
    res.cookie("authToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutAdmin = (req, res) => {
  // Clear the authentication cookie
  res.clearCookie("authToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout successful." });
};

module.exports = {
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
};
