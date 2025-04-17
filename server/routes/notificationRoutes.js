const express = require("express");
const uploadNotice = require("../middlewares/uploadNotice");

const {
  createNotification,
  getAllNotifications,
  getActiveNotifications,
  toggleNotificationActiveStatus,
  updateNotification,
  publishNotice,
  archiveNotice,
  softDeleteNotice,
  permanentDeleteNoticeById,
} = require("../controllers/notificationController");

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

const router = express.Router();

/**=================================
 * PUBLIC ROUTES
 * =================================*/
router.get("/active", getActiveNotifications);

router.use(authenticateToken);

/**=================================
 * ADMIN ONLY ROUTES
 * =================================*/
router.get(
  "/all",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["view-notification"]),
  getAllNotifications
);

router.post(
  "/create",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["create-notification"]),
  uploadNotice.single("file"),
  createNotification
);

router.patch(
  "/toggle/:id",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["toggle-notification-status"]),
  toggleNotificationActiveStatus
);

router.patch(
  "/:id",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["update-notification"]),
  uploadNotice.single("file"),
  updateNotification
);

router.patch(
  "/publish/:id",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["publish-notification"]),
  // uploadNotice.single("file"),
  publishNotice
);

router.patch(
  "/archive/:id",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["archive-notification"]),
  archiveNotice
);

router.patch(
  "/soft-delete/:id",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["soft-delete-notice"]),
  softDeleteNotice
);

router.delete(
  "/:id",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["delete-notification"]),
  permanentDeleteNoticeById
);

module.exports = router;
