import { apiSlice } from ".";
import type { User } from "../../types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    me: builder.query<User, void>({
      query: () => `/auth/me`,
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useMeQuery } =
  usersApiSlice;
