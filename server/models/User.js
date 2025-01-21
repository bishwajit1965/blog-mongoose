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

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     firebaseUid: { type: String, required: true, unique: true },
//     name: { type: String },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     avatar: { type: String },
//     roles: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "Role",
//       default: [],
//     },
//     permissions: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "Permission",
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// // Add instance methods
// userSchema.methods.hasRole = function (roleId) {
//   return this.roles.includes(roleId);
// };

// userSchema.methods.hasPermission = function (permissionId) {
//   return this.permissions.includes(permissionId);
// };

// const User = mongoose.model("User", userSchema);

// module.exports = User;
