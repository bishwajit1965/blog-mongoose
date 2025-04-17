const express = require("express");
const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

const {
  getAllAuditLogs,
  getAuditLogsBySlug,
  getAuditLogsByPostId,
  getAuditLogsByModeratorId,
  createAuditLogEntry,
} = require("../controllers/auditLogController");

const router = express.Router();

// Authenticate all routes
router.use(authenticateToken);

// Get all audit logs (accessible only by super-admin or admin)
router.get(
  "/",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["view-audit-log"]), // Specific permission added
  getAllAuditLogs
);

// Get audit logs for a specific post (using slug instead of postId)
router.get(
  "/post/:slug", // Using slug as identifier
  authorizeRoles(["super-admin"]),
  authorizePermissions(["view-audit-log"]), // Specific permission added
  getAuditLogsBySlug
);

router.get(
  "/post/:postId",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["view-audit-log"]), // Specific permission added
  getAuditLogsByPostId
);

// Get audit logs for a specific user (accessible by super-admin)
router.get(
  "/user/:userId",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["view-audit-log"]), // Specific permission added
  getAuditLogsByModeratorId
);

// Create a new audit log entry (typically triggered by internal backend actions)
router.post(
  "/create",
  authorizeRoles(["super-admin"]),
  authorizePermissions(["create-audit-log"]),
  createAuditLogEntry
);

module.exports = router;
