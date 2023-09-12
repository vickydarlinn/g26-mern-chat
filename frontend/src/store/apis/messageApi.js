import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const messageApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5555/api/v1/messages",
  }),
  endpoints: (builder) => ({
    fetchMessages: builder.query({
      query: (chatId) => {
        return {
          url: `/${chatId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
  }),
});

export const { useFetchMessagesQuery } = messageApi;
export { messageApi };
