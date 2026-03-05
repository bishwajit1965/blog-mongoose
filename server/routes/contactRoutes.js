const express = require("express");

const {
  createContact,
  getMyContacts,
  getAllContacts,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contactController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// User routes
router.post("/", createContact); // send message

router.get("/my", getMyContacts); // view own messages

// Admin/SuperAdmin routes
router.get("/", authorizeRoles("admin", "super-admin"), getAllContacts);

router.patch(
  "/:id",
  authorizeRoles(["admin", "super-admin"]),
  updateContactStatus,
);

router.delete("/:id", authorizeRoles(["admin", "super-admin"]), deleteContact);

module.exports = router;
