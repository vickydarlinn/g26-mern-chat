import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    showCreateGroupBox: false,
  },
  reducers: {
    setShowCreateGroupBox: (state, action) => {
      state.showCreateGroupBox = action.payload;
    },
  },
});

export const chatSliceReducer = chatSlice.reducer;
export const { setShowCreateGroupBox } = chatSlice.actions;
