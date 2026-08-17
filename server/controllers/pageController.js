const Page = require("../models/Page");

const createPage = async (req, res) => {
  try {
    const { title, slug, content, seoTitle, seoDescription, status, pageType } =
      req.body;

    if (!title || !slug || !content || !seoDescription) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
      });
    }

    const existingPage = await Page.findOne({ slug });

    if (existingPage) {
      return res.status(409).json({
        success: false,
        message: "Slug already exists.",
      });
    }

    const page = await Page.create({
      title,
      slug,
      content,
      seoTitle: seoTitle || title,
      seoDescription,
      status,
      pageType,
      publishedAt: status === "published" ? new Date() : null,
      createdBy: req.user?.id,
    });

    return res
      .status(201)
      .json({ success: true, message: "Page created", page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({
      slug,
      deletedAt: null,
      status: "published",
    })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found.",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Page fetched", page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find({ status: "published", deletedAt: null })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
    return res
      .status(200)
      .json({ success: true, message: "Pages fetched.", pages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findById(id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found.",
      });
    }

    // Prevent updating deleted pages
    if (page.deletedAt || page.deletedBy) {
      return res.status(400).json({
        success: false,
        message: "Deleted page cannot be updated. Restore it first.",
      });
    }

    const { title, slug, content, seoTitle, seoDescription, status, pageType } =
      req.body;

    if (title !== undefined) page.title = title;

    //   if (slug !== undefined) page.slug = slug.toLowerCase();
    if (slug !== undefined) {
      const existingPage = await Page.findOne({
        slug: slug.toLowerCase(),
        _id: { $ne: id },
      });

      if (existingPage) {
        return res.status(409).json({
          success: false,
          message: "Slug already exists.",
        });
      }

      page.slug = slug.toLowerCase();
    }

    if (content !== undefined) page.content = content;

    if (seoTitle !== undefined) page.seoTitle = seoTitle;

    if (seoDescription !== undefined) page.seoDescription = seoDescription;

    if (pageType !== undefined) page.pageType = pageType;

    if (status !== undefined) {
      page.status = status;

      // first time publishing
      if (status === "published" && !page.publishedAt) {
        page.publishedAt = new Date();
      }

      // optional: if moved back to draft
      if (status === "draft") {
        page.publishedAt = null;
      }
    }

    page.updatedBy = req.user.id;

    await page.save();

    return res.status(200).json({
      success: true,
      message: "Page updated.",
      page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const softDeletePage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findById(id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found.",
      });
    }

    if (page.deletedAt) {
      return res
        .status(400)
        .json({ success: false, message: "Post already deleted." });
    }

    page.deletedAt = new Date();

    page.deletedBy = req.user.id;

    await page.save();

    return res
      .status(200)
      .json({ success: true, message: "Page moved to trash.", page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const hardDeletePage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findById(id);

    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found." });
    }

    if (!page.deletedAt) {
      return res.status(400).json({
        success: false,
        message: "Soft delete the page first.",
      });
    }

    await page.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "Page permanently deleted.", page });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const restorePage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await Page.findById(id);

    if (!page)
      return res
        .status(404)
        .json({ success: false, message: "Page not found," });

    if (!page.deletedAt) {
      return res.status(400).json({
        success: false,
        message: "Page is already active.",
      });
    }

    page.deletedAt = null;
    page.deletedBy = null;
    page.updatedBy = req.user.id;

    await page.save();

    return res
      .status(200)
      .json({ success: true, message: "Page restored.", page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSoftDeletedPages = async (req, res) => {
  try {
    const pages = await Page.find({
      deletedAt: { $ne: null },
    })
      .populate("createdBy", "name email")
      .populate("deletedBy", "name email")
      .populate("updatedBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Soft deleted pages fetched.",
      pages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPage,
  getPageBySlug,
  getAllPages,
  updatePage,
  softDeletePage,
  hardDeletePage,
  restorePage,
  getSoftDeletedPages,
};
