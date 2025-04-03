const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
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
    isActive: { type: Boolean, default: true }, // Active or Inactive
    isOnline: { type: Boolean, default: false }, // Real-time online status
    lastSeen: { type: Date, default: null }, // Last active timestamp
    flaggedPosts: [
      {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
        flaggedAt: { type: Date, default: Date.now },
        reason: String,
        reviewStatus: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
    ],
    falseFlagCount: { type: Number, default: 0 },
    isBanned: { type: Boolean, default: false },
    banExpiresAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Ensure flaggedAt is set
userSchema.pre("save", function (next) {
  this.flaggedPosts.forEach((post) => {
    if (!post.flaggedAt) post.flaggedAt = new Date();
  });
  next();
});

// Clear banExpiresAt if not banned
userSchema.pre("save", function (next) {
  if (!this.isBanned) {
    this.banExpiresAt = null;
  }
  next();
});

// Check roles and permissions
userSchema.methods.hasRole = function (role) {
  return this.roles.some((r) => r.toString() === role.toString());
};

userSchema.methods.hasPermission = function (permission) {
  return this.permissions.some((p) => p.toString() === permission.toString());
};

const User = mongoose.model("User", userSchema);

module.exports = User;

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema(
//   {
//     firebaseUid: { type: String, required: true, unique: true },
//     name: { type: String, default: "Anonymous" },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       validate: {
//         validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
//         message: (props) => `${props.value} is not a valid email!`,
//       },
//     },
//     password: { type: String, required: true },
//     avatar: {
//       type: String,
//       default: "https://i.ibb.co/MgsDqCZ/FB-IMG-1678691214526.jpg",
//     },
//     roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
//     permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
//     isActive: { type: Boolean, default: true }, // Active or Inactive
//     isOnline: { type: Boolean, default: false }, // Real-time online status
//     lastSeen: { type: Date, default: null }, // Last active timestamp
//     flaggedPosts: [
//       {
//         postId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
//         flaggedAt: { type: Date, default: Date.now },
//         reason: String,
//         reviewStatus: {
//           type: String,
//           enum: ["pending", "approved", "rejected"],
//           default: "pending",
//         },
//       },
//     ],
//     falseFlagCount: { type: Number, default: 0 },
//     isBanned: { type: Boolean, default: false },
//     banExpiresAt: { type: Date, default: null },
//   },
//   { timestamps: true }
// );

// // Helper methods for roles and permissions
// userSchema.methods.hasRole = function (role) {
//   return this.roles.includes(role);
// };

// userSchema.methods.hasPermission = function (permission) {
//   return this.permissions.includes(permission);
// };

// const User = mongoose.model("User", userSchema);

// module.exports = User;
