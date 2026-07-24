const express = require("express");

const {
  createPage,
  getPageBySlug,
  getAllPages,
  updatePage,
  softDeletePage,
  restorePage,
  hardDeletePage,
  getSoftDeletedPages,
} = require("../controllers/pageController");

const {
  authenticateToken,
  authorizeRoles,
  authorizePermissions,
} = require("../middlewares/authenticateToken");

const router = express.Router();

router.get("/all", getAllPages);

router.use(authenticateToken);

router.get(
  "/soft-deleted",
  authorizeRoles(["super-admin"]),
  getSoftDeletedPages,
);

router.get("/:slug", getPageBySlug);

router.post("/create", authorizeRoles(["super-admin"]), createPage);

router.patch("/edit/:id", authorizeRoles(["super-admin"]), updatePage);

router.delete(
  "/soft-delete/:id",
  authorizeRoles(["super-admin"]),
  softDeletePage,
);

router.delete(
  "/hard-delete/:id",
  authorizeRoles(["super-admin"]),
  // authorizePermissions(["permanent-delete-page"]),
  hardDeletePage,
);

router.patch("/restore/:id", authorizeRoles(["super-admin"]), restorePage);

module.exports = router;
