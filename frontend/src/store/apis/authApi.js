// authSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5555" }), // Set your backend API base URL here
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (newUser) => {
        return {
          url: "/api/v1/auth/register",
          method: "POST",
          body: {
            fullName: newUser.fullName,
            email: newUser.email,
            userName: newUser.userName,
            password: newUser.password,
          },
        };
      },
    }),
    login: builder.mutation({
      query: (userCredentials) => {
        return {
          url: "/api/v1/auth/login",
          method: "POST",
          body: {
            email: userCredentials.email,
            password: userCredentials.password,
          },
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
export { authApi };
