const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    status: {
      type: String,
      required: true,
      enum: [
        "draft",
        "published",
        "scheduled",
        "publishAt",
        "archived",
        "coming-soon",
      ],
      default: "draft",
    },
    publishAt: {
      type: Date,
      default: null,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from title and handle uniqueness
BlogSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    const existingSlug = await this.constructor.findOne({ slug: this.slug });
    if (existingSlug) {
      this.slug = `${this.slug}-${Date.now()}`;
    }
  }
  // Automatically set `publishAt` for "scheduled" or "coming-soon" if not already set
  if (
    (this.status === "scheduled" || this.status === "coming-soon") &&
    !this.publishAt
  ) {
    this.publishAt = new Date();
  }
  // Set the `publishedAt` date if the status is "published"
  if (this.status === "publishAt" && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

module.exports = mongoose.model("Blog", BlogSchema);
