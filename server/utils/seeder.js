const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const slugify = require("slugify");
const Blog = require("../models/Blog"); // adjust the path as needed

// Connect to your MongoDB
mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedBlogs = async () => {
  try {
    // Clear existing blogs (optional)
    // await Blog.deleteMany({});
    // console.log("Existing blogs removed.");

    // Dummy ObjectIDs for related fields
    // In a real scenario, ensure these IDs exist in your database.
    const dummyCategoryId = new mongoose.Types.ObjectId();
    const dummyAuthorId = new mongoose.Types.ObjectId();
    const dummyTagIds = [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
    ];

    const blogs = [];

    // Create 10 dummy blog posts
    for (let i = 0; i < 10; i++) {
      const title = faker.lorem.sentence();
      const content = faker.lorem.paragraphs(3);
      const baseSlug = slugify(title, { lower: true, strict: true });
      // Append timestamp to ensure uniqueness
      const slug = `${baseSlug}-${Date.now()}`;
      const metaTitle = title.substring(0, 60);
      const metaDescription = content.substring(0, 160);
      const metaKeywords = title.toLowerCase().split(" ").slice(0, 10);

      const blogData = {
        title,
        content,
        slug,
        category: dummyCategoryId,
        tags: dummyTagIds,
        status: "published", // You can randomize or choose other statuses if needed
        publishAt: new Date(),
        author: dummyAuthorId,
        image: `/uploads/dummy-image-${i}.jpg`,
        metaTitle,
        metaDescription,
        metaKeywords,
      };

      blogs.push(blogData);
    }

    await Blog.insertMany(blogs);
    console.log("Dummy blogs seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding blogs:", error);
    process.exit(1);
  }
};

seedBlogs();
