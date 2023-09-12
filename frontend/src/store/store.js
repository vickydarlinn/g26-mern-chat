// store.js

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./apis/authApi";
import { chatApi } from "./apis/chatsApi";
import { usersApi } from "./apis/usersApi";
import { messageApi } from "./apis/messageApi";
import { chatSliceReducer } from "./slices/chatSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    chat: chatSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      chatApi.middleware,
      usersApi.middleware,
      messageApi.middleware
    ),
});

setupListeners(store.dispatch);

export { store };
export { useRegisterMutation, useLoginMutation } from "./apis/authApi";
export { useFetchUsersMutation } from "./apis/usersApi";
export {
  useCreateIndividualChatMutation,
  useFetchChatsQuery,
  useCreateGroupChatMutation,
} from "./apis/chatsApi";
export * from "./slices/chatSlice";
