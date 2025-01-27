const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  assignRolesAndPermissions,
  deleteUser,
} = require("../controllers/userManagementController");

const userAuthMiddleware = require("../middlewares/userAuthMiddleware");

router.post("/users", userAuthMiddleware, createUser);

router.get("/users", userAuthMiddleware, getAllUsers);

router.patch(
  "/user/:id/roles-permissions",
  userAuthMiddleware,
  assignRolesAndPermissions
);
router.delete("/user/:id", userAuthMiddleware, deleteUser);

module.exports = router;
