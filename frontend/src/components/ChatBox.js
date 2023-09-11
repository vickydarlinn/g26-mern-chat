import React from "react";

const ChatBox = () => {
  return (
    <form className="flex gap-4 items-center  h-[10vh] p-2">
      <input
        className="grow p-2 text-black"
        type="text"
        placeholder="Message"
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
