const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../utils/jwt");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email if exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Check if user has the role of admin
    if (!user.roles.includes("admin")) {
      return res.status(401).json({ message: "Access denied. Admins only." });
    }

    // Compare password

    if (password && user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
    }

    // Generate JWT
    const token = generateJWT({
      id: user._id,
      email: user.email,
      roles: user.roles,
    });
    console.log("Generated JWT", token);
    // Set HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      message: "Login is successful.",
      user: { email: user.email, roles: user.roles },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

const logoutAdmin = (req, res) => {
  // Clear the cookie
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logout successful." });
};

module.exports = { loginAdmin, logoutAdmin };
