import React from "react";
import ChatParticipants from "../components/chatBar/ChatParticipants";
import ChatWindow from "../components/chatBody/ChatWindow";
import ChatBox from "../components/chatFooter/ChatBox";
import NewGroupBox from "../components/NewGroupBox";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const { showCreateGroupBox, selectedChat } = useSelector(
    (state) => state.chat
  );
  return (
    <div className="flex gap-1 relative">
      <ChatParticipants />
      <div className="bg-[#193D3D] text-white grow relative">
        {selectedChat ? (
          <>
            <ChatWindow />
            <ChatBox />
          </>
        ) : (
          <div className="absolute left-0 top-0 w-full h-full bg-black/50 flex justify-center items-center">
            Click on user to chat with the user
          </div>
        )}

        {showCreateGroupBox && <NewGroupBox />}
      </div>
    </div>
  );
};

export default ChatPage;
