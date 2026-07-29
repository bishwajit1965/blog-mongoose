const express = require("express");
const { getAllMongoUsers } = require("../controllers/publicUsersController");

const router = express.Router();

router.get("/", getAllMongoUsers);

module.exports = router;
