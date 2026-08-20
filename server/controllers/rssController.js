const Blog = require("../models/Blog");
const siteUrl = process.env.SITE_URL || "http://localhost:5173";

const generateRSSFeed = async (req, res) => {
  try {
    const blogs = await Blog.find({
      status: "published",
    })
      .sort({ publishAt: -1 })
      .limit(24)
      .populate({
        path: "author",
        select: "name email avatar followers following isOnline lastSeen roles",
        populate: {
          path: "roles",
          select: "name description",
        },
      })
      .populate("category", "name")
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    const items = blogs
      .map(
        (blog) => `<item>
          <id><![CDATA[${blog._id}]]></id>
          <title><![CDATA[${blog.title}]]></title>
          <slug><![CDATA[${blog.slug}]]></slug>
          <link>
            ${siteUrl}/blog-details/${blog.slug}
          </link>
          <guid>
            ${siteUrl}/blog-details/${blog.slug}
          </guid>
          <description>
            <![CDATA[
              ${blog.excerpt}
            ]]>
          </description>
          <content>
            <![CDATA[
              ${blog.content}
            ]]>
          </content>
          <pubDate>
            ${new Date(blog.publishAt).toUTCString()}
          </pubDate>
          <image>${blog?.image?.url}</image>
          <category>
            ${blog?.category?.name || ""}
          </category>
          <roles>
            ${blog?.author?.roles || []}
          </roles>
          <author>
            ${blog.author?.name || ""}
          </author>
          <avatar>
            ${blog.author?.avatar || ""}
          </avatar>
        </item>`,
      )
      .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>
          Nova Journal
        </title>
        <link>
          ${siteUrl}
        </link>
        <description>
          Software engineering articles, architecture, debugging and full-stack development insights.
        </description>
        ${items}
      </channel>
    </rss>`;

    res.status(200).type("application/rss+xml").send(rss);
  } catch (error) {
    res.status(500).json({
      message: "RSS generation failed",
      error: error.message,
    });
  }
};

module.exports = { generateRSSFeed };
