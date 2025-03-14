const Blog = require("../models/Blog");

const getBlogStatus = async (req, res) => {
  try {
    const totalPosts = await Blog.countDocuments();
    const publishedPosts = await Blog.countDocuments({ status: "published" });
    const draftPosts = await Blog.countDocuments({ status: "draft" });
    const archivedPosts = await Blog.countDocuments({ status: "archived" });
    const comingSoonPosts = await Blog.countDocuments({
      status: "draft",
      willPublishAt: { $gt: new Date() },
    });

    // Category wise posts
    const categoryWisePosts = await Blog.aggregate([
      {
        $group: {
          _id: "$category", // Group by category ID
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories", // Assuming your category collection is named "categories"
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo", // Unwrap the category details
      },
      {
        $project: {
          categoryId: "$_id",
          categoryName: "$categoryInfo.name",
          count: 1,
        },
      },
    ]);

    res.json({
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      comingSoonPosts,
      categoryWisePosts,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error in fetching blog post status data!",
      error,
    });
  }
};

module.exports = { getBlogStatus };
