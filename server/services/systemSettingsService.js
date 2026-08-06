const SystemSettings = require("../models/SystemSettings");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/uploadToCloudinary");

const imageFields = {
  logo: ["branding", "logo"],
  favicon: ["branding", "favicon"],
  "og-image": ["seo", "ogImage"],
};

const editableFields = {
  site: ["name", "description", "websiteUrl"],
  branding: ["primaryColor", "secondaryColor", "footerText"],
  seo: ["metaTitle", "metaDescription", "keywords"],
  contact: ["email", "phone", "address"],
  socialLinks: [
    "facebook",
    "twitter",
    "linkedin",
    "github",
    "youtube",
    "instagram",
  ],
  features: [
    "maintenanceMode",
    "registrationEnabled",
    "commentsEnabled",
    "newsletterEnabled",
  ],
  localization: ["timezone", "language", "currency"],
  security: ["maxLoginAttempts", "sessionTimeout"],
  backup: ["enabled", "backupFrequency"],
  email: ["senderName", "senderEmail"],
};

const pickEditableSettings = (payload = {}) => {
  const settings = {};
  for (const [section, fields] of Object.entries(editableFields)) {
    if (!payload[section] || typeof payload[section] !== "object") continue;
    const values = {};
    for (const field of fields) {
      if (payload[section][field] !== undefined)
        values[field] = payload[section][field];
    }
    if (Object.keys(values).length) settings[section] = values;
  }
  return settings;
};

const getSystemSettings = async () => {
  let settings = await SystemSettings.findOne({ key: "system" });
  if (!settings) settings = await SystemSettings.create({ key: "system" });
  return settings;
};

const updateSystemSettings = async (payload, userId) => {
  const settings = await getSystemSettings();
  const updates = pickEditableSettings(payload);
  for (const [section, values] of Object.entries(updates)) {
    for (const [field, value] of Object.entries(values))
      settings.set(`${section}.${field}`, value);
  }
  settings.updatedBy = userId;
  return settings.save();
};

const updateSettingsImage = async (imageType, file, userId) => {
  const fieldPath = imageFields[imageType];
  if (!fieldPath) {
    const error = new Error("Unsupported image type.");
    error.status = 400;
    throw error;
  }
  if (!file) {
    const error = new Error("An image file is required.");
    error.status = 400;
    throw error;
  }
  const settings = await getSystemSettings();
  const [section, field] = fieldPath;
  const previousImage = settings[section]?.[field];
  const result = await uploadToCloudinary(
    file.buffer,
    "developer-diary/system-settings",
  );

  console.log("NEW CLOUDINARY ID:", result.public_id);
  settings.set(`${section}.${field}`, {
    url: result.secure_url,
    publicId: result.public_id,
  });
  settings.updatedBy = userId;

  console.log("After save:");
  console.log("Branding logo", settings.branding.logo);
  console.log("Branding Favicon", settings.branding.favicon);
  console.log("OG Image", settings.seo.ogImage);

  await settings.save();
  if (previousImage?.publicId)
    await deleteFromCloudinary(previousImage.publicId);
  return settings;
};

const toPublicSettings = (settings) => {
  const source = settings.toObject();
  return {
    site: source.site,
    branding: source.branding,
    seo: source.seo,
    contact: source.contact,
    socialLinks: source.socialLinks,
    features: source.features,
    localization: source.localization,
    updatedAt: source.updatedAt,
  };
};

module.exports = {
  getSystemSettings,
  updateSystemSettings,
  updateSettingsImage,
  toPublicSettings,
};
