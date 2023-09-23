import React, { useState, useEffect } from "react";
import { useFetchChatsQuery } from "../../store/store";
import RecentChatUser from "./RecentChatUser";

const RecentChats = () => {
  const { data: chats } = useFetchChatsQuery();
  const [allChats, setAllChats] = useState([]);

  useEffect(() => {
    setAllChats(chats?.data);
  }, [chats]);

  console.log(allChats);

  return (
    <div className="flex flex-col gap-2 mt-5 overflow-scroll">
      {allChats?.map((chat) => (
        <RecentChatUser chat={chat} key={chat._id} />
      ))}
    </div>
  );
};

export default RecentChats;
