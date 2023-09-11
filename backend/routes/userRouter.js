const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const userController = require("../controllers/userController");

// get all users
router.route("/").post(authMiddleware, userController.fetchUsers);
//create a chat;

module.exports = router;
