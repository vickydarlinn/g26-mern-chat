import React from "react";

const RecentChatUser = ({ chat }) => {
  const isGroupChat = chat.isGroupChat;

  const handleShowChat = (user) => {
    console.log(user);
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
