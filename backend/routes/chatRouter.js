const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const chatController = require("../controllers/chatController");
// get all chats
router.route("/").get(authMiddleware, chatController.fetchChats);
// create a chat
router.route("/").post(authMiddleware, chatController.createChat); //create a chat;
// create a group chat

module.exports = router;
