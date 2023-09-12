import React from "react";
import { useDispatch } from "react-redux";
import { setShowCreateGroupBox } from "../../store/store";
import SearchBar from "./SearchBar";
import RecentChats from "./RecentChats";

const ChatParticipants = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-80 h-screen bg-[#193D3D] text-white px-2 flex flex-col">
      <SearchBar />
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">My chats</p>
        <button
          onClick={() => {
            dispatch(setShowCreateGroupBox(true));
          }}
          className="p-2 w-36 bg-green-950 text-white cursor-pointer"
        >
          Create Group+
        </button>
      </div>

      <RecentChats />
    </div>
  );
};

export default ChatParticipants;
