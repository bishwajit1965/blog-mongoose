const express = require("express");

const router = express.Router();

const {
  getAllCommentsForAdmin,
  approveComment,
  rejectComment,
  deleteCommentByAdmin,
} = require("../controllers/adminCommentController");

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

// Verify authentication
router.use(authenticateToken);

// Admin related routes follow
router.get("/admin/get-comments/:id", getAllCommentsForAdmin);

router.patch(
  "/admin/approve-comment/:id",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["approve-comments"]),
  approveComment
);

router.patch(
  "/admin/reject-comment/:id",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["reject-comments"]),
  rejectComment
);

router.delete(
  "/admin/delete-comment/:id",
  authorizeRoles(["super-admin", "admin"]),
  authorizePermissions(["delete-comments"]),
  deleteCommentByAdmin
);

module.exports = router;
