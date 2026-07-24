const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    content: {
      type: String,
      required: true,
    },

    seoTitle: {
      type: String,
      trim: true,
      default: "",
    },

    seoDescription: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      trim: true,
      default: "draft",
    },

    publishedAt: {
      type: Date,
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    deletedAt: {
      type: Date,
      default: null,
    },

    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    pageType: {
      type: String,
      enum: [
        "about",
        "contact",
        "privacy-policy",
        "terms-and-conditions",
        "cookie-policy",
        "disclaimer",
        "dmca",
        "editorial-policy",
        "licensing",
        "custom",
      ],
      default: "custom",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Page", pageSchema);
