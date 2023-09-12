import React from "react";
import { useFetchChatsQuery } from "../../store/store";
import RecentChatUser from "./RecentChatUser";

const RecentChats = () => {
  const { data: allChats } = useFetchChatsQuery();

  return (
    <div className="flex flex-col gap-2 mt-5 overflow-scroll">
      {allChats?.data?.map((chat) => (
        <RecentChatUser chat={chat} key={chat._id} />
      ))}
    </div>
  );
};

export default RecentChats;
