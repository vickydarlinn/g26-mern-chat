import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "../../store/store";

const ChatBox = () => {
  const [sendMessageFn] = useSendMessageMutation();
  const { selectedChat } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");
  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log(message);
    await sendMessageFn({
      userId: localStorage.getItem("userId"),
      message,
      chatId: selectedChat._id,
    });
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
