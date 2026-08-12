const SystemSettings = require("../models/SystemSettings");

const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/uploadToCloudinary");

// Max sizes defined for upload
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const MAX_OG_IMAGE_SIZE = 5 * 1024 * 1024;

const createSystemSettings = async (req, res) => {
  try {
    const existingSettings = await SystemSettings.findOne({ key: "system" });

    if (existingSettings) {
      return res.status(400).json({
        success: false,
        message: "System settings already exist.",
      });
    }

    const settings = await SystemSettings.create({
      ...req.body,
      key: "system",
      updatedBy: req.user?.id || null,
    });

    return res.status(201).json({
      success: true,
      message: "System settings created successfully.",
      data: settings,
    });
  } catch (error) {
    console.error("Create System Settings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create system settings.",
      error: error.message,
    });
  }
};

/**
 * GET /api/settings/public
 * Fetch public system settings
 */

const getPublicSettings = async (req, res) => {
  try {
    const settings = await SystemSettings.findOne({ key: "system" });
    if (!settings) {
      settings = await SystemSettings.create({
        ...req.body,
        key: "system",
        updatedBy: req.user?.id || null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "System settings fetched successfully.",
      data: settings,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/settings
 * Fetch system settings
 */
const getSystemSettings = async (req, res) => {
  try {
    let settings = await SystemSettings.findOne({ key: "system" });

    // Create default document if it doesn't exist
    if (!settings) {
      settings = await SystemSettings.create({
        ...req.body,
        key: "system",
        updatedBy: req.user?.id || null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "System settings fetched.",
      data: settings,
    });
  } catch (error) {
    console.error("Get System Settings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch system settings.",
    });
  }
};

/**
 * PUT /api/settings
 * Update system settings
 */
const updateSystemSettings = async (req, res) => {
  try {
    const payload = req.body;

    let settings = await SystemSettings.findOne({
      key: "system",
    });

    if (!settings) {
      settings = await SystemSettings.create({
        ...payload,
        key: "system",
        updatedBy: req.user?.id || null,
      });

      return res.status(200).json({
        success: true,
        message: "System settings created and updated successfully.",
        data: settings,
      });
    }

    settings.set(payload);

    if (req.user?.id) {
      settings.updatedBy = req.user.id;
    }

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "System settings data updated.",
      data: settings,
    });
  } catch (error) {
    console.error("Update System Settings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update system settings.",
      error: error.message,
    });
  }
};

const updateSystemSettingsImage = async (req, res) => {
  try {
    const { imageType } = req.params;

    const allowedTypes = ["logo", "favicon", "ogImage"];

    if (!allowedTypes.includes(imageType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid image type.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required.",
      });
    }

    const allowedMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only PNG, JPG, JPEG, WEBP and SVG images are allowed.",
      });
    }

    const maxSize =
      imageType === "ogImage" ? MAX_OG_IMAGE_SIZE : MAX_IMAGE_SIZE;

    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message:
          imageType === "ogImage"
            ? "OG Image must not exceed 5 MB."
            : "Image must not exceed 2 MB.",
      });
    }

    const settings = await SystemSettings.findOne({
      key: "system",
    });

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "System settings not found.",
      });
    }

    let oldImage;

    // Determine current image location
    if (imageType === "logo") {
      oldImage = settings.branding.logo;
    }

    if (imageType === "favicon") {
      oldImage = settings.branding.favicon;
    }

    if (imageType === "ogImage") {
      oldImage = settings.seo.ogImage;
    }

    // Upload new image
    const uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      "nova-journal/settings",
    );

    // Delete old image
    if (oldImage?.publicId) {
      await deleteFromCloudinary(oldImage.publicId);
    }

    // Update database
    if (imageType === "logo") {
      settings.branding.logo = {
        secureUrl: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    }

    if (imageType === "favicon") {
      settings.branding.favicon = {
        secureUrl: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    }

    if (imageType === "ogImage") {
      settings.seo.ogImage = {
        secureUrl: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    }

    settings.updatedBy = req.user?.id || null;

    await settings.save();

    return res.status(200).json({
      success: true,
      message: `${imageType} updated successfully.`,
      data: settings,
    });
  } catch (error) {
    console.error("Update System Settings Image Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update image.",
      error: error.message,
    });
  }
};

module.exports = {
  createSystemSettings,
  getPublicSettings,
  getSystemSettings,
  updateSystemSettings,
  updateSystemSettingsImage,
};
