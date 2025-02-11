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

router.post(
  "/",
  verifyToken,
  isSuperAdmin(["super-admin", "admin"]),
  createCategory
);

router.get(
  "/:id",
  verifyToken,
  isSuperAdmin(["super-admin", "admin", "editor"]),
  getCategoryById
);

router.get(
  "/",
  verifyToken,
  isSuperAdmin(["super-admin", "admin", "editor"]),
  getAllCategories
);
router.patch(
  "/:id",
  verifyToken,
  isSuperAdmin(["super-admin", "admin"]),
  updateCategory
);

router.delete(
  "/:id",
  verifyToken,
  isSuperAdmin(["super-admin", "admin"]),
  deleteCategory
);

module.exports = router;
