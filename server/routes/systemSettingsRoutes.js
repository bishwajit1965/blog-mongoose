const express = require("express");
const upload = require("../middlewares/upload");

const {
  createSystemSettings,
  getPublicSettings,
  getSystemSettings,
  updateSystemSettings,
  updateSystemSettingsImage,
} = require("../controllers/systemSettingsController");

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

const router = express.Router();

// FRONTEND ROUTE
router.get("/public", getPublicSettings);

router.use(
  authenticateToken,
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["upload-settings", "update-settings"]),
);

// BACKEND ROUTES
router.get("/", getSystemSettings);

// Create the singleton system settings document (Run only once)
router.post("/create", createSystemSettings);

router.put("/edit", updateSystemSettings);

router.patch(
  "/images/:imageType",
  upload.single("image"),
  updateSystemSettingsImage,
);

module.exports = router;
