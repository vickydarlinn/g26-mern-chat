import React, { useState } from "react";
import {
  useFetchUsersMutation,
  useCreateIndividualChatMutation,
} from "../../store/store";

const SearchBar = () => {
  const [fetchUsersFn, { data: searchedNames }] = useFetchUsersMutation();
  const [createIndividualChatFn] = useCreateIndividualChatMutation();

  const [showSearchedUsers, setShowSearchedUsers] = useState(false);
  const [query, setQuery] = useState("");

  const [showOverlay, setShowOverlay] = useState(false);
  const handleSearchedQuery = async (e) => {
    e.preventDefault();
    await fetchUsersFn(query);
    setShowSearchedUsers(true);
    setShowOverlay(true);
  };

  const handleOverlayClick = () => {
    setShowSearchedUsers(false);
    setShowOverlay(false);
  };
  const handleMakeChat = async (user) => {
    await createIndividualChatFn(user);
    setShowSearchedUsers(false);
    setShowOverlay(false);
  };

  return (
    <form className={`my-5 w-full relative`}>
      <input
        type="text"
        className="w-full p-2 z-10 text-black border-bottom focus:outline-b-2 rounded-lg"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
      />
      <button className="hidden" onClick={handleSearchedQuery}>
        Search
      </button>
      {showSearchedUsers && (
        <>
          {showOverlay && (
            <div
              className="fixed inset-0 bg-[#00000079] cursor-pointer"
              onClick={handleOverlayClick}
            ></div>
          )}
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
        </>
      )}
    </form>
  );
};

export default SearchBar;
