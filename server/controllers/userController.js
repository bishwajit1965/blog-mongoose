const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validateUserInput } = require("../utils/validators");

const createUser = async (req, res) => {
  try {
    const {
      firebaseUid,
      name,
      email,
      password,
      avatar,
      roles = ["viewer"],
      permissions = ["read"],
    } = req.body; // Default role as "user"
    console.log("Request body:", req.body);

    if (!firebaseUid || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(409)
        .json({ status: "error", message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Validate user input
    validateUserInput({
      roles,
      permissions,
    });

    // Create a new user
    const newUser = new User({
      firebaseUid,
      name,
      email,
      password: hashedPassword,
      avatar,
      roles: roles || ["viewer"],
      permissions: permissions || ["read"],
    });

    const savedUser = await newUser.save();
    console.log("User saved successfully", savedUser);

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in creating user:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { createUser };
