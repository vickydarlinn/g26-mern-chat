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
    const userChats = await Chat.find({ members: userId }).sort([
      ["updatedAt", -1], // Sort by updatedAt in descending order
    ]);

    // Extract unique user IDs from the chats
    const chatParticipants = [];
    userChats.forEach((chat) => {
      if (!chat.isGroupChat) {
        chat.members.forEach((memberId) => {
          if (memberId.toString() !== userId) {
            chatParticipants.push(memberId);
          }
        });
      }
    });
    // write the code for group chat participants

    // Find the usernames of the chat participants
    const participantsInfo = await User.find({
      _id: { $in: [...chatParticipants] },
    }).select("-password");

    // this is unecessary code, If I remove this, so I need to change the frontend path too.
    // I am here removing the password key, we can do this in more better way too.
    const chatData = participantsInfo;

    res.status(200).json({ chatData });
  } catch (error) {
    console.error("Error fetching chats of this user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the chats." });
  }
};
