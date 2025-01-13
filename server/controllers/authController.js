const User = require("../models/userModel");
const { generateJWT } = require("../helpers/jwtHelpers");
const bcrypt = require("bcrypt");

// Register or login user
const registerOrLoginUser = async (req, res) => {
  const { uid, email, name, avatar, password } = req.body;
  try {
    let user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      // Create new user if not found
      user = await User.create({
        firebaseUid: uid,
        email,
        name,
        avatar,
        password: password ? bcrypt.hash(password, 10) : "undefined",
      });
    } else if (password) {
      // Compare passwords if user exists
      const isMatch = await user.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password." });
      }
    }
    // Generate JWT token
    const token = generateJWT({
      uid: user.uid,
      name: user.name,
      email: user.email,
      roles: user.roles,
    });

    // Set token in HTTP only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });
    res.status(200).json({ message: "User is authenticated", user });
  } catch (error) {
    console.error("Server error.", error);
    res.status.json({ message: "Server error.", error: error.message });
  }
};

module.exports = { registerOrLoginUser };
