const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission", // this will reference Permission model
      },
    ],
    // permissions: {
    //   type: [String], //Array of permissions (e.g.,["read", "write", "delete"])
    //   default: ["read"],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
