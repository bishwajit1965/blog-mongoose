const express = require("express");
const {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { verifyToken, isSuperAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, isSuperAdmin(["admin"]), createCategory);

router.get(
  "/:id",
  verifyToken,
  isSuperAdmin(["admin", "editor"]),
  getCategoryById
);

router.get(
  "/",
  verifyToken,
  isSuperAdmin(["admin", "editor"]),
  getAllCategories
);
router.patch("/:id", verifyToken, isSuperAdmin(["admin"]), updateCategory);

router.delete(
  "/:id",
  verifyToken,
  isSuperAdmin(["admin", "super-admin"]),
  deleteCategory
);

module.exports = router;
