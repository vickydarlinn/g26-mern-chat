import React, { useState } from "react";
import {
  useFetchUsersMutation,
  useCreateGroupChatMutation,
} from "../store/store";

// This functional component represents a dialog box for creating a new group.
const NewGroupBox = ({ setShowCreateGroupBox }) => {
  const [fetchUsersFn] = useFetchUsersMutation(); // Custom hook for fetching users
  const [createGroupChatFn] = useCreateGroupChatMutation(); // Custom hook for creating a group chat
  const [searchQuery, setSearchQuery] = useState(""); // State to store the user's search query
  const [searchedUsers, setSearchedUsers] = useState([]); // State to store the search results
  const [groupMembers, setGroupMembers] = useState([]); // State to store selected group members
  const [groupName, setGroupName] = useState(""); // State to store the group name

  // Function to handle closing the dialog box when clicking the black overlay
  const handleRemoveBox = (e) => {
    // Check if the click event originated from the black overlay (outer div)
    if (e.target.classList.contains("bg-[#00000079]")) {
      setShowCreateGroupBox(false);
    }
  };

  // Function to handle user input and trigger the search for users
  const handleSearch = async () => {
    try {
      // Call the fetchUsersFn with the search query and update the searchedUsers state
      const result = await fetchUsersFn(searchQuery);
      setSearchedUsers(result.data.users); // Assuming the result is an array of users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle pressing Enter key in the search input to trigger the search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Function to remove a member from the groupMembers array
  const handleRemoveMember = (user) => {
    setGroupMembers((prevMembers) => {
      // Use the filter method to create a new array without the selected user
      const updatedMembers = prevMembers.filter(
        (member) => member._id !== user._id
      );
      return updatedMembers;
    });
  };

  // Function to create a new group chat
  const handleCreateGroup = () => {
    const membersId = groupMembers.map((member) => member._id);
    // Call the createGroupChatFn with the selected members and group name
    createGroupChatFn({ members: membersId, name: groupName });
  };

  return (
    <div
      className="w-screen h-screen bg-[#00000079] absolute left-0 top-0"
      onClick={handleRemoveBox}
    >
      <div className="absolute z-10 left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] flex flex-col gap-1 p-3 w-96 min-h-[300px] bg-gray-100 rounded-lg text-gray-800">
        <span className="self-center font-bold">Create New Group</span>

        {/* Input for entering the group name */}
        <input
          className="w-full p-2 border focus:outline-b-2 rounded-lg"
          type="text"
          placeholder="group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)} // Update the group name state
        />

        {/* Input for searching and adding users */}
        <input
          className="w-full p-2 border focus:outline-b-2 rounded-lg"
          type="text"
          placeholder="add Users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress} // Call handleSearch when Enter key is pressed
        />

        {/* Display selected group members */}
        <div className="m-2 flex gap-2 flex-wrap">
          {groupMembers.map((member) => (
            <span
              key={member._id}
              className="bg-green-800 rounded-lg text-white p-1 px-2 flex items-center gap-2"
            >
              <span>{member.userName}</span>{" "}
              <span
                className="cursor-pointer"
                onClick={() => handleRemoveMember(member)}
              >
                X
              </span>
            </span>
          ))}
        </div>

        {/* Display searched users with a scrollable container */}
        <div className="flex flex-col gap-2 pb-4 max-h-48 overflow-scroll">
          {searchedUsers?.map((user) => (
            <div
              className="p-2 bg-gray-300 rounded-lg cursor-pointer"
              onClick={() => setGroupMembers((prev) => [...prev, user])}
              key={user._id}
            >
              {user.userName}
            </div>
          ))}
        </div>

        {/* Close button */}
        <span
          className="absolute top-1 right-2 text-red-600 font-bold cursor-pointer"
          onClick={() => setShowCreateGroupBox(false)}
        >
          X
        </span>

        {/* Button to create the group */}
        <button
          onClick={handleCreateGroup}
          className="mt-auto w-full p-2 bg-green-900 text-white"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default NewGroupBox;
