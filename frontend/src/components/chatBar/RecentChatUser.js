import React from "react";
import { setSelectedChat } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

const RecentChatUser = ({ chat }) => {
  const { socket } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const isGroupChat = chat.isGroupChat;

  const handleShowChat = (chat) => {
    dispatch(setSelectedChat(chat));
    console.log(chat);
    socket.emit("chatRoom", chat._id);
  };

  const chatName = isGroupChat
    ? chat.name
    : chat.members.find(
        (member) => member._id !== localStorage.getItem("userId")
      ).userName;

  const lastMessageContent = chat.lastMessage ? chat.lastMessage.content : "";
  // const lastMessageSenderName = chat.lastMessage
  //   ? chat.lastMessage.sender.userName
  //   : "";
  const lastMessageSenderName =
    chat?.lastMessage?.sender._id === localStorage.getItem("userId")
      ? "You"
      : chat?.lastMessage?.sender.userName;

  return (
    <div
      onClick={() => handleShowChat(chat)}
      key={chat._id}
      className="cursor-pointer bg-green-900 p-2 rounded-lg text-xl font-bold m-1 capitalize"
    >
      {chatName}
      <div>
        <span className="text-sm font-bold">{lastMessageSenderName}:</span>{" "}
        <span className="text-sm font-medium">{lastMessageContent}</span>
      </div>
    </div>
  );
};

export default RecentChatUser;
