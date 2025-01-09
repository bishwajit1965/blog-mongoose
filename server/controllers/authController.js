const User = require("../models/userModel");
const { generateJWT } = require("../helpers/jwtHelpers");

// Register or login user
const registerOrLoginUser = async (req, res) => {
  const { uid, email, name, photoUrl, password } = req.body;
  try {
    let user = await User.findOne({ uid });
    if (!user) {
      // Create new user if not found
      user = await User.create({ uid, email, name, photoUrl, password });
    } else {
      // Compare passwords if user exists
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password." });
      }
    }
    const token = generateJWT({
      uid: user.uid,
      name: user.name,
      email: user.email,
      roles: user.roles,
    });
    res.cookie("token", token, {
      httpOnly: true,
      saneSite: strict,
      maxAge: 3600000,
    });
    res.status(200).json({ message: "User is authenticated", user });
  } catch (error) {
    res.status.json({ message: "Server error.", error: error.message });
  }
};

module.exports = { registerOrLoginUser };
