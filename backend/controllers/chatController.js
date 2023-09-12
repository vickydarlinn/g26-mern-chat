const Chat = require("../models/chatModel"); // Import the Chat model
const User = require("../models/userModel"); // Import the User model

// Controller function to create a chat
exports.createChat = async (req, res) => {
  const { isGroupChat, members, name, userId } = req.body;

  try {
    console.log(isGroupChat, name, userId);
    console.log(members);
    if (isGroupChat) {
      // Check if the chat name already exists
      const existingChatName = await Chat.findOne({ name });
      if (existingChatName) {
        return res.status(400).json({
          error: "Chat name already exists. Please choose a different name.",
        });
      }
      // If it's a group chat, set the group admin to the user creating the chat
      const groupAdmin = userId;
      // Add the group admin to the list of members
      members.push(groupAdmin);
      // Create the chat document
      const newChat = new Chat({
        isGroupChat,
        members,
        name,
        groupAdmin,
      });
      const savedChat = await newChat.save();
      return res.status(201).json(savedChat);
    } else {
      // If it's not a group chat, create the chat document without a group admin
      const existingChat = await Chat.findOne({
        isGroupChat: false,
        members: { $all: [userId, ...members] },
      });

      if (existingChat) {
        return res.status(400).json({
          error: "Individual chat already exists between these users.",
        });
      }
      members.push(userId);
      const newChat = new Chat({
        isGroupChat,
        members,
        name,
      });

      const savedChat = await newChat.save();

      res.status(201).json({ message: "success" });
    }
  } catch (error) {
    console.error("Error creating chat:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the chat." });
  }
};

// controller function to fetch all chats of the current user
exports.fetchChats = async (req, res) => {
  const { userId } = req.body;

  try {
    // Find all chats where the current user is a member
    let userChats = await Chat.find({ members: userId })
      .populate("members", "-password")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });

    res.status(200).json({ message: "success", data: userChats });
  } catch (error) {
    console.error("Error fetching chats of this user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the chats." });
  }
};
