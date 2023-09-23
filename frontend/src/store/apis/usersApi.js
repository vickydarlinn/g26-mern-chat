import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://g26-mern-chat-api.onrender.com/api/v1/users",
  }),
  endpoints: (builder) => ({
    fetchUsers: builder.mutation({
      query: (searchedUser) => {
        console.log(searchedUser);
        return {
          url: `?searchedUser=${searchedUser}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
  }),
});

export const { useFetchUsersMutation } = usersApi;
export { usersApi };
