const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const messageController = require("../controllers/messageController");

// get all message
router.route(`/:chatId`).get(authMiddleware, messageController.fetchMessages);
router.route(`/`).post(authMiddleware, messageController.createMessage);

module.exports = router;
