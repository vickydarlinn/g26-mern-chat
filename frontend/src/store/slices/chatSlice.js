import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    showCreateGroupBox: false,
    selectedChat: null,
  },
  reducers: {
    setShowCreateGroupBox: (state, action) => {
      state.showCreateGroupBox = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export const chatSliceReducer = chatSlice.reducer;
export const { setShowCreateGroupBox, setSelectedChat } = chatSlice.actions;
