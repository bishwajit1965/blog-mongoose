const { SitemapStream, streamToPromise } = require("sitemap");
const path = require("path");
const fs = require("fs"); // Add the fs import
const Blog = require("../models/Blog"); // Adjust the path to your Blog model
const apiURL = process.env.API_URL || "http://localhost:3000";

const generateSitemap = async () => {
  // Ensure the public directory exists
  const publicDir = path.join(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const sitemapPath = path.join(__dirname, "../public/sitemap.xml");
  const sitemapStream = new SitemapStream({
    hostname: `${apiURL}`,
  });

  try {
    const blogs = await Blog.find({ status: "published" }, "slug").select(
      "slug updatedAt"
    );
    blogs.forEach((blog) => {
      sitemapStream.write({
        url: `/blogs/${blog.slug}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: blog.updatedAt.toISOString(), //Include the last modified string
      });
    });

    sitemapStream.end();
    // Use streamToPromise directly to write the data into sitemap.xml
    const sitemapData = await streamToPromise(sitemapStream);
    fs.writeFileSync(sitemapPath, sitemapData.toString(), "utf8");

    console.log("Sitemap generated successfully");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
};

module.exports = generateSitemap;
