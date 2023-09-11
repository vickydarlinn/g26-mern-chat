import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5555/api/v1/users" }),
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
