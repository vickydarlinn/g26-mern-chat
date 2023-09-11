import React, { useState } from "react";
import {
  useFetchChatsQuery,
  useFetchUsersMutation,
  useCreateIndividualChatMutation,
} from "../store/store";

const ChatParticipants = ({ setShowCreateGroupBox }) => {
  const [query, setQuery] = useState("");
  const [fetchUsersFn, { data: searchedNames }] = useFetchUsersMutation();
  const [createIndividualChatFn] = useCreateIndividualChatMutation();
  const { data: allChats } = useFetchChatsQuery();
  const handleSearchedQuery = (e) => {
    e.preventDefault();
    fetchUsersFn(query);
  };
  const handleMakeChat = (user) => {
    console.log(user);
    createIndividualChatFn(user);
  };
  const chats = [
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
    { userName: "vicky", time: 12 },
  ];
  return (
    <div className="w-80 h-screen bg-[#193D3D] text-white  px-2  flex flex-col ">
      <form className="my-5 w-full  relative ">
        <input
          type="text"
          className="w-full p-2 text-black border-bottom focus:outline-b-2 rounded-lg "
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
        />
        <button className="hidden" onClick={handleSearchedQuery}>
          Search
        </button>
        {searchedNames && (
          <div className="flex flex-col absolute bg-gray-400 w-full top-full p-2 max-h-40 overflow-auto gap-1 mt-1 rounded-md">
            {searchedNames.users.length ? (
              searchedNames.users?.map((user) => (
                <div
                  key={user._id}
                  className="bg-gray-600 p-3 text-center rounded-lg capitalize cursor-pointer"
                  onClick={() => handleMakeChat(user)}
                >
                  {user.userName}
                </div>
              ))
            ) : (
              <div className="bg-red-400 p-3 text-center rounded-lg capitalize cursor-pointer">
                Not found
              </div>
            )}
          </div>
        )}
      </form>
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">My chats</p>
        <button
          onClick={() => {
            setShowCreateGroupBox(true);
          }}
          className="p-2 w-36 bg-green-950 text-white cursor-pointer"
        >
          Create Group+
        </button>
      </div>

      <div className="flex flex-col  gap-2 mt-5 overflow-scroll  ">
        {allChats?.chatData?.map((chat) => (
          <div
            key={chat.userName}
            className="cursor-pointer bg-green-900 p-2 rounded-lg text-xl font-bold m-1 capitalize"
          >
            {chat.userName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatParticipants;
