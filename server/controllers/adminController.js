const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateJWT, verifyJWT } = require("../utils/jwt");

// Login Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required." });

    const user = await User.findOne({ email })
      .populate("roles", "name")
      .populate("permissions", "name");

    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return res.status(401).json({ message: "Invalid email or password." });

    const payload = {
      id: user._id,
      email: user.email,
      roles: user.roles.map((r) => r.name),
      permissions: user.permissions.map((p) => p.name),
    };

    const accessToken = generateJWT(payload, "access");
    const refreshToken = generateJWT(payload, "refresh");

    await User.findByIdAndUpdate(user._id, {
      isOnline: true,
      lastSeen: new Date(),
    });

    const isProduction = process.env.NODE_ENV === "production";

    // Set cookies
    res
      .cookie("authToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "Strict" : "Lax",
        maxAge: 15 * 60 * 1000, // 15 min
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "Strict" : "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          roles: user.roles,
          permissions: user.permissions,
        },
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Refresh Access Token
const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token missing" });

    const decoded = verifyJWT(refreshToken, "refresh");
    if (!decoded || decoded.expired)
      return res
        .status(401)
        .json({ message: "Refresh token invalid or expired" });

    const user = await User.findById(decoded.id)
      .populate("roles", "name")
      .populate("permissions", "name");

    if (!user) return res.status(403).json({ message: "User not found" });

    const payload = {
      id: user._id,
      email: user.email,
      roles: user.roles.map((r) => r.name),
      permissions: user.permissions.map((p) => p.name),
    };

    const newAccessToken = generateJWT(payload, "access");

    res.cookie("authToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout Admin
const logoutAdmin = async (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (token) {
      const decoded = verifyJWT(token, "access");

      if (decoded && !decoded.expired) {
        await User.findByIdAndUpdate(decoded.id, {
          isOnline: false,
          lastSeen: new Date(),
        });
      }
    }

    res.clearCookie("authToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "Logout successful.",
    });
  } catch (error) {
    console.error("Logout error:", error);

    res.clearCookie("authToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "Logout successful.",
    });
  }
};

module.exports = { loginAdmin, refreshAccessToken, logoutAdmin };
