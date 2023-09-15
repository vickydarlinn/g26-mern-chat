import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchMessagesQuery } from "../../store/store";
// import { useDispatch } from "react-redux";

const ChatWindow = () => {
  const { socket } = useSelector((state) => state.chat);
  const [allMessages, setAllMessages] = useState([]);
  const { selectedChat } = useSelector((state) => state.chat);
  const { data: messages } = useFetchMessagesQuery(selectedChat._id);

  useEffect(() => {
    socket.on("new recieved message", (message) => {
      console.log(message);
      setAllMessages((prevMessages) => {
        const newMessage = {
          sender: {
            _id: message.userId,
          },
          chat: {
            _id: message.chatId,
          },
          content: message.message,
        };

        return [...prevMessages, newMessage];
      });
    });
  }, [socket]);
  console.log(allMessages);

  useEffect(() => {
    setAllMessages(messages?.data);
  }, [messages]);

  const chatName = selectedChat.isGroupChat
    ? selectedChat.name
    : selectedChat.members.find(
        (member) => member._id !== localStorage.getItem("userId")
      ).userName;

  return (
    <div className=" ">
      <header className="flex items-center justify-between px-5 h-[10vh] ">
        <span className="font-bold text-xl capitalize">{chatName}</span>
        <button className="p-2 w-36 bg-orange-600 text-white cursor-pointer">
          Log Out
        </button>
      </header>
      <div className="bg-[#102526] h-[80vh] flex flex-col p-4 gap-2 overflow-auto ">
        {selectedChat.isGroupChat
          ? allMessages?.map((message) => {
              if (message.sender._id === localStorage.getItem("userId")) {
                return (
                  <div
                    key={message._id}
                    className="self-end  border border-white w-fit rounded-l-3xl  rounded-b-3xl max-w-lg flex flex-col "
                  >
                    <span className="p-1 self-end text-orange-400">You</span>
                    <span className="px-3 pb-2">{message?.content}</span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={message._id}
                    className="  border border-white w-fit rounded-r-3xl  rounded-b-3xl max-w-lg flex flex-col "
                  >
                    <span className="p-1  text-green-400 capitalize">
                      {message.sender.userName}
                    </span>
                    <span className="px-3 pb-2">{message?.content}</span>
                  </div>
                );
              }
            })
          : allMessages?.map((message) => {
              if (message.sender._id === localStorage.getItem("userId")) {
                return (
                  <span
                    key={message._id}
                    className="self-end p-2 border border-white w-fit rounded-l-3xl  rounded-b-3xl max-w-lg"
                  >
                    {message?.content}
                  </span>
                );
              } else {
                return (
                  <span
                    key={message._id}
                    className="p-2 border border-white w-fit rounded-r-3xl rounded-b-3xl max-w-lg"
                  >
                    {message?.content}
                  </span>
                );
              }
            })}
      </div>
    </div>
  );
};

export default ChatWindow;
