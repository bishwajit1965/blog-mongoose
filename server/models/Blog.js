const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    content: { type: String, required: true },
    excerpt: { type: String, maxlength: 250 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true },
    ],
    status: {
      type: String,
      required: true,
      enum: [
        "draft",
        "published",
        "scheduled",
        "archived",
        "coming-soon",
        "deleted",
      ],
      default: "draft",
    },
    publishAt: { type: Date, default: null },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String, default: null },

    //✅Flagged status to be saved in blogs collection
    isFlagged: { type: Boolean, default: false },
    flaggedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    flagCount: { type: Number, default: 0 },
    lastFlaggedAt: { type: Date },
    flaggedAt: { type: [Date], default: [] },
    reviewStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewComment: { type: String, default: null },

    reviewHistory: [
      {
        comment: { type: String },
        reviewedAt: { type: Date },
        reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],

    reviewedAt: { type: [Date], default: [] }, // empty array by default

    // ✅ Flagging reasons
    flaggedReason: {
      type: [String],
      enum: ["Spam", "Offensive", "Incorrect Information", "Other"], // predefined reasons
      default: ["Other"], // default to 'Other' if no reason is provided
    },

    // ✅ SEO fields
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: [String], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Soft delete method
BlogSchema.methods.softDelete = function () {
  this.deletedAt = new Date();
  return this.save();
};

// Restore method
BlogSchema.methods.restore = function () {
  this.deletedAt = null;
  return this.save();
};

// Archive method
BlogSchema.methods.archive = async function () {
  const ArchivedBlog = mongoose.model("ArchivedBlog");
  const archivedBlog = new ArchivedBlog({
    ...this.toObject(),
    archivedAt: new Date(),
  });

  await archivedBlog.save();
  this.status = "archived";
  return this.save();
};

//✅ Pre-save hook to generate slug from title and ensure uniqueness
BlogSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    let existingSlug = await this.constructor.findOne({ slug: this.slug });
    let counter = 1;

    while (existingSlug) {
      this.slug = `${slugify(this.title, {
        lower: true,
        strict: true,
      })}-${counter}`;
      existingSlug = await this.constructor.findOne({ slug: this.slug });
      counter++;
    }
  }

  // ✅ Prevent empty publish date for scheduled & coming-soon posts
  if (
    (this.status === "scheduled" || this.status === "coming-soon") &&
    !this.publishAt
  ) {
    this.publishAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default: 7 days later
  }

  if (this.status === "published" && !this.publishAt) {
    this.publishAt = new Date();
  }

  // ✅ Auto-generate SEO meta title & description
  if (!this.metaTitle) {
    this.metaTitle = this.title.substring(0, 57) + "...";
  }
  if (!this.metaDescription) {
    this.metaDescription = this.content.substring(0, 157) + "...";
  }
  if (!this.metaKeywords || this.metaKeywords.length === 0) {
    this.metaKeywords = this.title.toLowerCase().split(" ").slice(0, 10);
  }

  next();
});

module.exports = mongoose.model("Blog", BlogSchema);

// const mongoose = require("mongoose");
// const slugify = require("slugify");

// const BlogSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       index: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//     excerpt: { type: String, maxlength: 250 },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     tags: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Tag",
//         required: true,
//       },
//     ],
//     status: {
//       type: String,
//       required: true,
//       enum: [
//         "draft",
//         "published",
//         "scheduled",
//         "publishAt",
//         "archived",
//         "coming-soon",
//         "deleted",
//       ],
//       default: "draft",
//     },
//     publishAt: {
//       type: Date,
//       default: null,
//     },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     image: {
//       type: String,
//       default: null,
//     },
//     // ✅ Flagging fields
//     flagged: {
//       type: Boolean,
//       default: false, // Indicates if the post is flagged
//     },
//     flaggedReason: [String], // Store multiple reasons
//     flaggedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null, // User who flagged the post
//     },
//     flaggedAt: [Date],
//     reviewedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null, // Admin who reviewed the flag
//     },
//     reviewComment: {
//       type: String,
//       default: null, // Comment by admin on review
//     },
//     reviewStatus: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending", // Status of moderation review
//     },

//     //✅ Seo fields
//     metaTitle: {
//       type: String,
//       default: "",
//     },
//     metaDescription: {
//       type: String,
//       default: "",
//     },
//     metaKeywords: {
//       type: [String],
//       default: [],
//     },
//     deletedAt: { type: Date, default: null }, //Null means not deleted
//   },
//   { timestamps: true }
// );

// // Soft delete method
// BlogSchema.methods.softDelete = function () {
//   this.deletedAt = new Date();
//   return this.save();
// };

// // Restore method
// BlogSchema.methods.restore = function () {
//   this.deletedAt = null;
//   return this.save();
// };

// // Archive method
// BlogSchema.methods.archive = async function () {
//   const archivedBlog = new ArchivedBlog({
//     ...this.toObject(),
//     archivedAt: new Date(),
//   });

//   await archivedBlog.save();

//   this.status = "archived";
//   return this.save();
// };

// // Pre-save hook to generate slug from title and handle uniqueness
// BlogSchema.pre("save", async function (next) {
//   if (this.isModified("title") || !this.slug) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//     const existingSlug = await this.constructor.findOne({ slug: this.slug });
//     if (existingSlug) {
//       this.slug = `${this.slug}-${Date.now()}`;
//     }
//   }
//   // Automatically set `publishAt` for "scheduled" or "coming-soon" if not already set
//   if (
//     (this.status === "scheduled" || this.status === "coming-soon") &&
//     !this.publishAt
//   ) {
//     this.publishAt = new Date();
//   }

//   // Set the `publishAt` date if the status is "published"
//   if (this.status === "published" && !this.publishAt) {
//     this.publishAt = new Date();
//   }
//   // ✅ Auto generate SEO meta title and description if not provided
//   if (!this.metaTitle) {
//     this.metaTitle = this.title.substring(0, 60);
//   }
//   if (!this.metaDescription) {
//     this.metaDescription = this.content.substring(0, 160);
//   }
//   if (!this.metaKeywords || this.metaKeywords.length === 0) {
//     this.metaKeywords = this.title.toLowerCase().split(" ").slice(0, 10);
//   }

//   next();
// });

// module.exports = mongoose.model("Blog", BlogSchema);
