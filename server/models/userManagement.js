const mongoose = require("mongoose");

const userManagementSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: false, unique: true },
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
