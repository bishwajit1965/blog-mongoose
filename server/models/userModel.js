const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: false },
    name: { type: String, required: false },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    avatar: {
      type: String,
    },
    roles: {
      type: [String],
      enum: ["admin", "editor", "viewer", "writer", "user"],
      default: ["viewer"],
    },
    permissions: {
      type: [String],
      enum: ["create", "read", "update", "delete", "super_admin", "member"],
      default: ["read"],
    },
  },
  { timestamps: true }
);

// Add a method to check if the user gas a specific role
userSchema.methods.hasRole = function (role) {
  return this.roles.includes(role);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
