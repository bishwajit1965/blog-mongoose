const Blog = require("../models/Blog");
const path = require("path");
const fs = require("fs");
const slugify = require("slugify");
const mongoose = require("mongoose");

const createBlog = async (req, res) => {
  try {
    const { title, content, category, tags, status, publishedAt } = req.body;
    const userId = req.user?.id;
    console.log("User Id:", userId);

    if (!req.user.permissions.includes("create-post")) {
      return res
        .status(403)
        .json({ message: "You do not have permission to create a blog!" });
    }
    const formattedTags = Array.isArray(tags)
      ? tags
          .map((tag) =>
            mongoose.Types.ObjectId.isValid(tag) ? tag.toString() : null
          )
          .filter(Boolean)
      : [];
    let slug = slugify(title, { lower: true, strict: true });
    const slugExists = await Blog.findOne({ slug });
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const newBlog = new Blog({
      title,
      slug,
      content,
      category,
      tags: formattedTags,
      status,
      publishedAt,
      author: userId,
      image: imagePath,
    });
    const blog = await newBlog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog", error });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "published" })
      .populate("author", "name email")
      .populate("category", "name")
      .populate("tags", "name");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
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
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

const updateBlogBySlug = async (req, res) => {
  try {
    const { title, content, category, tags, status, publishedAt, author } =
      req.body;
    const { userId } = req.user;
    console.log("Received tags:", tags);
    console.log("Type of tags:", typeof tags);

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

    if (!req.user.permissions.includes("edit-post")) {
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
      if (blog.image) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "uploads",
          path.basename(blog.image)
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      blog.image = `/uploads/${req.file.filename}`;
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    blog.tags = formattedTags;
    blog.markModified("tags");
    blog.status = status || blog.status;
    blog.publishedAt = publishedAt || blog.publishedAt;
    blog.author = author || blog.author;
    const updatedBlog = await blog.save();
    console.log("Updated blog post:", updatedBlog);
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog", error });
  }
};

const deleteBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!req.user.permissions.includes("delete-post")) {
      return res.status(403).json({ message: "Unauthorized to delete blog" });
    }

    let blog;
    if (mongoose.Types.ObjectId.isValid(slug)) {
      blog = await Blog.findById(slug);
    } else {
      blog = await Blog.findOne({ slug });
    }
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.image) {
      const imagePath = path.resolve("uploads", path.basename(blog.image));

      try {
        await fs.promises.unlink(imagePath);
      } catch (err) {
        console.warn("Error deleting blog image:", err.message);
      }
    }
    await Blog.deleteOne({ _id: blog._id });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlogBySlug,
  deleteBlogBySlug,
};
