import React from "react";
import ChatParticipants from "../components/chatBar/ChatParticipants";
import ChatWindow from "../components/chatBody/ChatWindow";
import ChatBox from "../components/chatFooter/ChatBox";
import NewGroupBox from "../components/NewGroupBox";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const { showCreateGroupBox } = useSelector((state) => state.chat);
  return (
    <div className="flex gap-1 relative">
      <ChatParticipants />
      <div className="bg-[#193D3D] text-white grow">
        <ChatWindow />
        <ChatBox />
        {showCreateGroupBox && <NewGroupBox />}
      </div>
    </div>
  );
};

export default ChatPage;
