const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    name: { type: String, default: "Anonymous" },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://i.ibb.co/MgsDqCZ/FB-IMG-1678691214526.jpg",
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  },
  { timestamps: true }
);

// Helper methods for roles and permissions
userSchema.methods.hasRole = function (role) {
  return this.roles.includes(role);
};

userSchema.methods.hasPermission = function (permission) {
  return this.permissions.includes(permission);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
