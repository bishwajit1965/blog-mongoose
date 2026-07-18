const Blog = require("../models/Blog");
const User = require("../models/User");
const FlaggedPost = require("../models/FlaggedPost");
const path = require("path");
const fs = require("fs");
const slugify = require("slugify");
const mongoose = require("mongoose");
const generateSitemap = require("../utils/sitemap");
const { create } = require("xmlbuilder2");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/uploadToCloudinary");
// const deleteFromCloudinary = require("../utils/uploadToCloudinary");

const generateExcerpt = (content, maxLength = 500) => {
  if (!content) return ""; // Return empty if no content is provided

  // If content length is less than or equal to maxLength, return it with "..."
  if (content.length <= maxLength) {
    return content.trim() + "..."; // Add ellipsis if it's short enough
  }

  // Truncate the content to the specified maxLength
  let excerpt = content.substring(0, maxLength);

  // Look for the last period within the last 40 characters of the excerpt
  const lastPeriodIndex = excerpt.lastIndexOf(".");

  // If a period is found within the last 40 characters, cut the excerpt at the period
  if (lastPeriodIndex !== -1 && lastPeriodIndex > maxLength - 40) {
    excerpt = excerpt.substring(0, lastPeriodIndex + 1) + "..."; // Add ellipsis after the period
  } else {
    // If no period is found within the acceptable range, just truncate and add "..."
    excerpt = excerpt.substring(0, maxLength - 3) + "..."; // Add ellipsis at the end of the truncated string
  }
  return excerpt;
};

const createBlog = async (req, res) => {
  console.log("📌Create blog post controller is hit");
  try {
    let {
      title,
      content,
      excerpt,
      category,
      tags,
      status,
      publishAt,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    const userId = req.user.id;
    console.log("User Id", userId);

    const user = await User.findById({ _id: userId });
    console.log("User", user);

    if (!req.user.permissions.includes("create-post")) {
      return res
        .status(403)
        .json({ message: "You do not have permission to create a blog!" });
    }

    // console.log("User Id:", userId);

    if (!excerpt) {
      excerpt = await generateExcerpt(content); // ✅ Now allowed because `excerpt` is `let`
    }

    if (excerpt.length > 250) {
      excerpt = excerpt.substring(0, 247) + "..."; // ✅ Allowed with `let`
    } else if (excerpt.length === 0) {
      excerpt = await generateExcerpt(content);
      if (excerpt.length > 250) {
        excerpt = excerpt.substring(0, 247) + "...";
      }
    }

    const formattedTags = Array.isArray(tags)
      ? tags
          .map((tag) =>
            mongoose.Types.ObjectId.isValid(tag) ? tag.toString() : null,
          )
          .filter(Boolean)
      : [];

    let slug = slugify(title, { lower: true, strict: true });

    const slugExists = await Blog.findOne({ slug });

    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }
    // let imagePath = null;

    let image = {
      url: null,
      publicId: null,
    };

    if (req.file) {
      try {
        const uploadedImage = await uploadToCloudinary(
          req.file.buffer,
          "developer-diary/blogs",
        );
        image = {
          url: uploadedImage.secure_url,
          publicId: uploadedImage.public_id,
        };

        // imagePath = uploadedImage.secure_url;
      } catch (error) {
        return res.status(500).json({
          message: "Image upload failed",
          error: error.message,
        });
      }
    }

    let validPublishAt = null;
    if (["scheduled", "coming-soon"].includes(status)) {
      if (!publishAt || isNaN(new Date(publishAt).getTime())) {
        return res
          .status(400)
          .json({ message: "Invalid publishAt date format!" });
      }
      validPublishAt = new Date(publishAt);
    }
    // ✅ Auto generate missing SEO fields
    const seoTitle = metaTitle || title.substring(0, 60);
    let seoDescription = metaDescription || content.substring(0, 160);
    const seoKeywords =
      metaKeywords && metaKeywords.length > 0
        ? metaKeywords
        : title.toLowerCase().split(" ").slice(0, 10);

    // Ensure SEO description isn't too short
    if (seoDescription.length < 160) {
      seoDescription = seoDescription + " ...";
    }

    const newBlog = new Blog({
      title,
      slug,
      content,
      excerpt,
      category,
      tags: formattedTags,
      status,
      publishAt: validPublishAt,
      author: userId, // Mongo _id
      firebaseUid: user.firebaseUid || null,
      image,
      metaTitle: seoTitle,
      metaDescription: seoDescription,
      metaKeywords: seoKeywords,
    });
    console.log("✅ NEW BLOG POST", newBlog);
    const blog = await newBlog.save();

    await generateSitemap(); // ✅ Regenerate sitemap after successful blog creation

    res.status(201).json(blog);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];

      return res.status(409).json({
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`,
      });
    }

    console.error("Error creating blog:", error);

    res.status(500).json({
      message: "Something went wrong while creating the blog.",
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      status: "published",
      moderationStatus: { $nin: ["hidden", "deleted"] },
    })
      .populate("author", "name email avatar")
      .populate("category", "name")
      .populate("tags", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// Super Admin Dashboard Blog posts
const getBlogsForSuperAdminDashBoard = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("author", "name email avatar")
      .populate("category", "name")
      .populate("tags", "name")
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "published",
    })
      .populate("author", "name email")
      .populate("category", "name")
      .populate("tags", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    await generateSitemap(); // ✅ Regenerate sitemap after successful blog fetching by slug
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

const getRandomPost = async (req, res) => {
  try {
    const count = await Blog.countDocuments({ status: "published" });
    const random = Math.floor(Math.random() * count);
    const randomPost = await Blog.find({ status: "published" })
      .skip(random)
      .populate("author", "name email avatar")
      .populate("category", "name")
      .populate("tags", "name")
      .limit(4);
    if (!randomPost) {
      return res.status(404).json({ message: "No random post found" });
    }
    res.status(200).json(randomPost);
  } catch (error) {
    console.error("Error fetching random post:", error);
    res.status(500).json({ message: "Error fetching random post", error });
  }
};

const getRelatedBlogPosts = async (req, res) => {
  const { slug } = req.params;
  try {
    const currentPost = await Blog.findOne({ slug });
    if (!currentPost)
      return res.status(404).json({ message: "Blog post not found." });

    const relatedPost = await Blog.find({
      slug: { $ne: slug },
      $or: [
        { category: currentPost.category },
        { tags: { $in: currentPost.tags } },
      ],
    })
      .populate("author", "name email avatar")
      .populate("category", "name")
      .populate("tags", "name")
      .limit(15); // Adjust limit as needed
    res.json(relatedPost);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching related posts.",
      error,
    });
  }
};

const trimExcerpt = (text, maxLength = 250) => {
  if (!text) return "";
  if (text.length <= maxLength) return text; // ✅ Return as is if within limit

  let trimmed = text.substring(0, maxLength); // Take first `maxLength` chars
  const lastSentenceEnd = trimmed.lastIndexOf("."); // Find last full stop
  const lastSpace = trimmed.lastIndexOf(" "); // Find last space

  if (lastSentenceEnd !== -1 && lastSentenceEnd > maxLength * 0.5) {
    return trimmed.substring(0, lastSentenceEnd + 1) + "..."; // ✅ Ends at sentence + ellipsis
  } else if (lastSpace !== -1) {
    return trimmed.substring(0, lastSpace) + "..."; // ✅ Ends at word boundary
  } else {
    return trimmed + "..."; // ✅ Fallback (cuts mid-word)
  }
};

const updateBlogBySlug = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      tags,
      status,
      publishAt,
      author,
    } = req.body;

    const userId = req.user.id;

    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    let formattedTags = [];

    if (Array.isArray(tags)) {
      formattedTags = tags
        .map((tag) => {
          if (typeof tag === "object" && tag._id) {
            return tag._id.toString();
          } else if (
            typeof tag === "string" &&
            mongoose.Types.ObjectId.isValid(tag)
          ) {
            return tag;
          } else {
            console.warn("Invalid tag format:", tag);
            return null;
          }
        })
        .filter(Boolean);
    } else {
      console.error("Invalid tags format received:", tags);
      return res
        .status(400)
        .json({ message: "Tags must be an array of ObjectIds" });
    }

    const isSuperAdmin = req.user.roles
      .map((r) => r.toLowerCase())
      .includes("super-admin");

    if (!isSuperAdmin && !req.user.permissions.includes("edit-post")) {
      return res.status(403).json({
        message: "You do not have permission to update this blog!",
      });
    }

    if (title && title !== blog.title) {
      let newSlug = slugify(title, { lower: true, strict: true });
      const slugExists = await Blog.findOne({ slug: newSlug });
      if (slugExists) {
        newSlug += `-${Date.now()}`;
      }
      blog.slug = newSlug;
    }

    if (req.file) {
      const oldPublicId = blog.image?.publicId;

      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "developer-diary/blogs",
      );

      blog.image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };

      if (oldPublicId) {
        await deleteFromCloudinary(oldPublicId);
      }
    }

    // ✅generate metaKeywords from title and content
    if (title !== blog.title || content !== blog.content) {
      blog.metaTitle = `${title} | ${process.env.SITE_NAME || "Nova Journal"}`;
      blog.metaDescription = content.substring(0, 160) + "..."; //First 150 characters of content
      // ✅Generate metaKeywords from title and content
      const stopWords = [
        "article",
        "the",
        "a",
        "of",
        "off",
        "in",
        "into",
        "to",
        "blog",
        "post",
        "the",
        "and",
        "with",
        "for",
        "about",
      ]; // Add more if needed

      const generateMetaKeywords = (text) => {
        return [
          ...new Set(
            text
              .toLowerCase()
              .replace(/[^\w\s]/gi, "") // Remove punctuation
              .split(/\s+/) // Split into words
              .filter((word) => word.length > 2 && !stopWords.includes(word)), // Remove short words
          ),
        ].slice(0, 10); // Limit to 10 keywords
      };

      blog.metaKeywords = generateMetaKeywords(title + " " + content);
      blog.markModified("metaTitle");
      blog.markModified("metaDescription");
      blog.markModified("metaKeywords");
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.excerpt = excerpt ? trimExcerpt(excerpt) : blog.excerpt;
    blog.category = category || blog.category;
    blog.tags = formattedTags;
    blog.markModified("tags");
    blog.status = status || blog.status;
    blog.publishAt = publishAt || blog.publishAt;
    blog.author = author || blog.author;

    const updatedBlog = await blog.save();

    await generateSitemap(); // ✅ Regenerate sitemap after successful blog update
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog", error });
  }
};

// Soft delete blog by slug
const softDeletePost = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!req.user.permissions.includes("soft-delete-blog-post")) {
      return res
        .status(403)
        .json({ message: "Unauthorized to soft delete blog post." });
    }

    let blog = mongoose.Types.ObjectId.isValid(slug)
      ? await Blog.findById(slug)
      : await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Set status to "deleted" by setting `deletedAt` to current date
    blog.status = "deleted";
    blog.deletedAt = new Date();
    await blog.save();
    await generateSitemap(); // ✅ Regenerate sitemap after successful blog deletion
    res.status(200).json({ message: "Blog soft deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: error.message });
  }
};

// Restore soft deleted blog by slug
const restoreSoftDeletedPost = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!req.user.permissions.includes("restore-post")) {
      return res
        .status(403)
        .json({ message: "Unauthorized to restore soft deleted blog post." });
    }

    let blog;
    if (mongoose.Types.ObjectId.isValid(slug)) {
      blog = await Blog.findById(slug);
    } else {
      blog = await Blog.findOne({ slug });
    }

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    blog.status = "published"; //✅ Set status to "published" to restore blog
    blog.deletedAt = null; //✅ Restore by setting `deletedAt` to null
    await blog.save();
    await generateSitemap(); // ✅ Regenerate sitemap after successful blog restoration
    res.status(200).json({ message: "Blog restored successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error restoring blog", error: error.message });
  }
};

// Get all non-soft deleted blogs
const getAllNonDeletedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .populate("author", "name email")
      .populate("category", "name")
      .populate("tags", "name");
    await generateSitemap(); // ✅ Regenerate sitemap after successful blog fetching
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// Flag post method
const flagPost = async (req, res) => {
  const { slug } = req.params;
  const { reason } = req.body;
  const userId = req.user.id; // User who is flagging the post

  try {
    const blogPost = await Blog.findOne({ slug });
    if (!blogPost) {
      return res.status(404).json({
        status: "error",
        message: "Blog post not found.",
      });
    }

    const postId = blogPost._id;
    const userId = blogPost.author; // Author of the blog post
    const flaggedPostSlug = blogPost.slug;
    const flaggedPostTitle = blogPost.title;

    if (blogPost.flaggedBy.includes(userId)) {
      return res.status(400).json({
        status: "error",
        message: "You have already flagged this post.",
      });
    }

    const now = new Date();
    blogPost.flaggedBy.push(userId);
    blogPost.flagCount += 1;
    blogPost.isFlagged = true;
    blogPost.flaggedAt.push(now);
    blogPost.lastFlaggedAt = now;
    blogPost.reviewStatus = "pending";
    blogPost.flaggedReason = reason && reason.length ? reason : ["Other"];
    blogPost.flaggingHistory.push({
      userId,
      reason,
      flaggedAt: new Date(),
    });

    await blogPost.save();

    // ✅ Check if the flagged post already exists in FlaggedPost collection
    // If it does, update it; if not, create a new one
    const existingFlaggedPost = await FlaggedPost.findOne({
      flaggedSlug: flaggedPostSlug,
    });

    if (existingFlaggedPost) {
      existingFlaggedPost.flaggedBy.push(userId);
      existingFlaggedPost.flagCount += 1;
      existingFlaggedPost.isFlagged = true;
      existingFlaggedPost.flaggedAt.push(now);
      existingFlaggedPost.flaggedReason =
        reason && reason.length ? reason : ["Other"];
      existingFlaggedPost.lastFlaggedAt = now;
      await existingFlaggedPost.save();

      // Update flaggedPosts array in User model
      await User.findByIdAndUpdate(userId, {
        $push: {
          flaggedPosts: {
            postId: postId,
            flaggedSlug: flaggedPostSlug,
            flaggedTitle: flaggedPostTitle,
            flaggedReason: reason && reason.length ? reason : ["Other"],
            flaggedBy: userId,
            flaggedAt: new Date(),
          },
        },
      });
    } else {
      const newFlaggedPost = new FlaggedPost({
        postId: postId,
        userId: userId,
        flaggedSlug: flaggedPostSlug,
        flaggedTitle: flaggedPostTitle,
        flaggedBy: [userId],
        flaggedReason: reason && reason.length ? reason : ["Other"],
        flaggedAt: [new Date()],
      });
      console.log("New flagged post:", newFlaggedPost);
      await newFlaggedPost.save();

      // Update flaggedPosts array in User model
      await User.findByIdAndUpdate(userId, {
        $push: {
          flaggedPosts: {
            postId: postId, // Add postId here
            flaggedSlug: flaggedPostSlug, // Add flaggedSlug here
            flaggedTitle: flaggedPostTitle,
            flaggedReason: reason && reason.length ? reason : ["Other"],
            flaggedBy: userId, // Add flaggedBy here
            flaggedAt: new Date(),
          },
        },
      });

      return res.status(200).json({
        status: "success",
        message: "Post has been flagged successfully.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while flagging the post.",
    });
  }
};

// Get flagging history
const getFlaggingHistory = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findById(slug).populate(
      "flaggingHistory.userId",
      "name",
    );
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.json({ flaggingHistory: blog.flaggingHistory });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch flagging history.", error });
  }
};

// Get Popular Posts
const getPopularPosts = async (req, res) => {
  try {
    const popularPosts = await Blog.aggregate([
      {
        $match: { status: "published" },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },
      {
        $addFields: {
          commentCount: {
            $size: {
              $filter: {
                input: "$comments",
                as: "comment",
                cond: { $eq: ["$$comment.status", "approved"] },
              },
            },
          },
        },
      },
      {
        $sort: { commentCount: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          title: 1,
          content: 1,
          image: 1,
          slug: 1,
          featuredImage: 1,
          commentCount: 1,
          createdAt: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      popularPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching popular posts",
    });
  }
};

// Get RSS feed
const getRssFeed = async (req, res) => {
  try {
    const siteUrl = process.env.SITE_URL || "http://localhost:5173";

    const posts = await Blog.find({
      status: "published",
      // isDeleted: false,
    })
      .sort({ publishAt: -1 })
      .limit(20);

    const feed = create({ version: "1.0", encoding: "UTF-8" })
      .ele("rss", {
        version: "2.0",
        "xmlns:atom": "http://www.w3.org/2005/Atom",
      })

      .ele("channel")

      .ele("title")
      .txt("Nova Journal")
      .up()

      .ele("link")
      .txt(siteUrl)
      .up()

      .ele("description")
      .txt("Latest articles from Nova Journal")
      .up()

      .ele("language")
      .txt("en")
      .up()

      .ele("lastBuildDate")
      .txt(new Date().toUTCString())
      .up()

      .ele("generator")
      .txt("Nova Journal RSS Generator")
      .up()

      .ele("atom:link", {
        href: `${siteUrl}/api/blogs/rss`,
        rel: "self",
        type: "application/rss+xml",
      })
      .up();

    posts.forEach((post) => {
      const url = `${siteUrl}/blog-details/${post.slug}`;

      feed
        .ele("item")

        .ele("title")
        .txt(post.title || "Untitled")
        .up()

        .ele("link")
        .txt(url)
        .up()

        .ele("guid", {
          isPermaLink: "true",
        })
        .txt(url)
        .up()

        .ele("description")
        .txt(post.excerpt || post.content?.substring(0, 300) || "")
        .up()

        .ele("pubDate")
        .txt(new Date(post.publishAt || post.createdAt).toUTCString())
        .up();

      // Optional category
      if (post.category?.name) {
        feed.ele("category").txt(post.category.name).up();
      }

      // Optional author
      if (post.author?.name) {
        feed.ele("author").txt(post.author.name).up();
      }

      feed.up(); // closes <item>
    });

    const xml = feed.end({
      prettyPrint: true,
    });

    res.setHeader("Content-Type", "application/rss+xml; charset=UTF-8");
    res.send(xml);
  } catch (error) {
    console.error("RSS ERROR:", error);
    res.status(500).send("Failed to generate RSS feed");
  }
};

// Delete Blog By Slug
const deleteBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!req.user.permissions.includes("delete-post")) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to permanently delete blog.",
      });
    }

    const blog = mongoose.Types.ObjectId.isValid(slug)
      ? await Blog.findById(slug)
      : await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // Remove Cloudinary image
    if (blog.image?.publicId) {
      try {
        await deleteFromCloudinary(blog.image.publicId);
      } catch (error) {
        console.warn("Cloudinary image deletion failed:", error.message);
      }
    }

    // Remove database document
    await Blog.deleteOne({
      _id: blog._id,
    });

    // Update sitemap
    await generateSitemap();

    res.status(200).json({
      success: true,
      message: "Blog permanently deleted successfully.",
    });
  } catch (error) {
    console.error("Permanent delete error:", error);

    res.status(500).json({
      success: false,
      message: "Error permanently deleting blog.",
      error: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogsForSuperAdminDashBoard,
  getRandomPost,
  getRelatedBlogPosts,
  getBlogBySlug,
  updateBlogBySlug,
  softDeletePost,
  restoreSoftDeletedPost,
  getAllNonDeletedBlogs,
  flagPost,
  getFlaggingHistory,
  getPopularPosts,
  getRssFeed,
  deleteBlogBySlug,
};
