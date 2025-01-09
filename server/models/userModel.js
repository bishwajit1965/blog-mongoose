const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: [true, "Name is required."] },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    photoUrl: { type: String },
    password: { type: String, required: true },
    firebaseUID: { type: String, required: true, unique: true },
    roles: { type: [String], default: ["user"] },
  },
  { timeStamp: true }
);

// Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Compare passwords for login
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

module.exports = mongoose.model("User", userSchema);
