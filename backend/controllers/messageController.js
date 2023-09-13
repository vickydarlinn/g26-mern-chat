const Message = require("../models/messageModel");

// Controller function to get all message of  a chat
exports.fetchMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chats = await Message.find({ chat: chatId })
      .populate("sender", "-password")
      .populate("chat")
      .sort({ updatedAt: 1 });
    res.status(200).json({ message: "fetched Successfully", data: chats });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({
      error: "An error occurred while fetching all the messages of the chat.",
    });
  }
};

// contoller function to create a message of a specific chat
exports.createMessage = async (req, res) => {
  const { sender, content, chat } = req.body;
  try {
    const message = await Message.create({
      sender,
      content,
      chat,
    });
    const savedMessage = await message.save();
    res
      .status(200)
      .json({ message: "fetched Successfully", data: savedMessage });
  } catch (error) {
    console.error("Error creating chat:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the chat." });
  }
};
