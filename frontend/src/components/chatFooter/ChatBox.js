import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "../../store/store";

const ChatBox = () => {
  const [sendMessageFn] = useSendMessageMutation();
  const { selectedChat, socket } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const data = {
      userId: localStorage.getItem("userId"),
      message,
      chatId: selectedChat._id,
    };
    await sendMessageFn(data);
    socket.emit("new message", data);

    // setMessage([...messages, data]);
    setMessage("");
  };
  return (
    <form
      onSubmit={(e) => handleSendMessage(e)}
      className="flex gap-4 items-center  h-[10vh] p-2"
    >
      <input
        className="grow p-2 text-black"
        type="text"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        className="p-2 w-36 bg-green-600 hover:bg-green-800 text-white cursor-pointer"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default ChatBox;
