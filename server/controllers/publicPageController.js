const Page = require("../models/Page");

const getPublicPageBySlug = async (req, res) => {
  console.log("📌 Public get page controller hit");
  const { slug } = req.params;
  console.log("Slug", slug);

  const page = await Page.findOne({
    slug,
    status: "published",
  });

  if (!page) {
    return res.status(404).json({
      message: "Page not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Public pages fetched",
    page,
  });
};

module.exports = { getPublicPageBySlug };
