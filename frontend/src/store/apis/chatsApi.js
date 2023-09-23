import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
  reducerPath: "chatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://g26-mern-chat-api.onrender.com/api/v1/chats",
  }),
  endpoints: (builder) => ({
    fetchChats: builder.query({
      providesTags: ["getAllChats"],
      query: () => {
        return {
          url: "/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    createIndividualChat: builder.mutation({
      invalidatesTags: ["getAllChats"],

      query: (user) => {
        return {
          url: "/",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {
            isGroupChat: false,
            members: [user._id],
            name: null, // No need for a name in individual chats
          },
        };
      },
    }),
    createGroupChat: builder.mutation({
      invalidatesTags: ["getAllChats"],

      query: (group) => {
        console.log(group);
        return {
          url: "/",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {
            isGroupChat: true,
            members: group.members,
            name: group.name, // No need for a name in individual chats
          },
        };
      },
    }),
  }),
});

export const {
  useFetchChatsQuery,
  useCreateIndividualChatMutation,
  useCreateGroupChatMutation,
} = chatApi;
export { chatApi };
