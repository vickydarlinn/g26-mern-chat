import React, { useState } from "react";
import ChatParticipants from "../components/ChatParticipants";
import ChatWindow from "../components/ChatWindow";
import ChatBox from "../components/ChatBox";
import NewGroupBox from "../components/NewGroupBox";

const ChatPage = () => {
  const [showCreateGroupBox, setShowCreateGroupBox] = useState(false);
  return (
    <div className="flex gap-1 relative">
      <ChatParticipants setShowCreateGroupBox={setShowCreateGroupBox} />
      <div className="bg-[#193D3D] text-white grow">
        <ChatWindow />
        <ChatBox />
        {showCreateGroupBox && (
          <NewGroupBox setShowCreateGroupBox={setShowCreateGroupBox} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
