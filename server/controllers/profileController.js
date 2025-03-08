const User = require("../models/User");

// Fetch all user profiles
const getAllProfiles = async (req, res) => {
  try {
    const users = await User.find().populate("roles").populate("permissions");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
};

// Fetch single user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("roles")
      .populate("permissions");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("roles")
      .populate("permissions");

    res
      .status(200)
      .json({ message: "Profile updated successfully!", updatedUser });
  } catch (error) {
    console.error("Error during update:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};

module.exports = { getAllProfiles, getProfile, updateProfile };
