const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
    ],
    name: {
      type: String,
    },
    unreadMessagesCount: {
      type: Number,
      default: 0,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message", // Reference to the Message
    },
  },
  {
    timestamps: true, // Enable timestamps
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
