const mongoose = require("mongoose");

const userManagementSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: { type: String },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  },
  { timestamps: true }
);

userManagementSchema.methods.hasRole = function (roleId) {
  return this.roles.some((role) => role.toString() === roleId.toString());
};

userManagementSchema.methods.hasPermission = function (permissionId) {
  return this.permissions.some(
    (permission) => permission.toString() === permissionId.toString()
  );
};

const UserManagement = mongoose.model("UserManagement", userManagementSchema);

module.exports = UserManagement;
