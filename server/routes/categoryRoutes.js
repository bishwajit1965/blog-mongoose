const express = require("express");
const {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authenticateToken");

const router = express.Router();

// Public routes - No authentication required
router.get("/", getAllCategories); // View all categories
router.get("/:id", getCategoryById); // View single category by id

// Verify token for all routes those follow
router.use(authenticateToken);

router.post("/", authorizeRoles(["super-admin", "admin"]), createCategory);

router.get(
  "/:id",
  authorizeRoles(["super-admin", "admin", "editor"]),
  getCategoryById
);

router.get(
  "/",
  authorizeRoles(["super-admin", "admin", "editor"]),
  getAllCategories
);

router.patch("/:id", authorizeRoles(["super-admin", "admin"]), updateCategory);

router.delete("/:id", authorizeRoles(["super-admin", "admin"]), deleteCategory);

module.exports = router;
