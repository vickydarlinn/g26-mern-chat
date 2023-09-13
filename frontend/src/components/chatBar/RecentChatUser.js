import React from "react";
import { setSelectedChat } from "../../store/store";
import { useDispatch } from "react-redux";

const RecentChatUser = ({ chat }) => {
  const dispatch = useDispatch();
  const isGroupChat = chat.isGroupChat;

  const handleShowChat = (chat) => {
    dispatch(setSelectedChat(chat));
    console.log(chat);
  };

  const chatName = isGroupChat
    ? chat.name
    : chat.members.find(
        (member) => member._id !== localStorage.getItem("userId")
      ).userName;
  return (
    <div
      onClick={() => handleShowChat(chat)}
      key={chat._id}
      className="cursor-pointer bg-green-900 p-2 rounded-lg text-xl font-bold m-1 capitalize"
    >
      {chatName}
    </div>
  );
};

export default RecentChatUser;
