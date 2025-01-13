const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { firebaseUid, name, email, password, avatar, roles } = req.body; // Default role as "user"
    console.log("Request body:", req.body);

    if (!firebaseUid || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Validate roles
    const validRoles = ["user", "admin", "editor", "super-admin"];

    if (!roles.every((role) => validRoles.includes(role))) {
      return res.status(400).json({ message: "Invalid roles provided." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create a new user
    const newUser = new User({
      firebaseUid,
      name: name,
      email,
      password: hashedPassword,
      avatar: avatar || null,
      roles: roles || ["user"],
    });

    await newUser.save();
    console.log("User saved successfully", newUser);

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in creating user:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { createUser };
