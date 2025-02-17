import { apiSlice } from ".";
import type { User } from "../types";

type Login = { email: string; password: string };

type Signup = { email: string; password: string; confirmPassword: string };

type Token = { accessToken: string; refreshToken: string };

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Token, Login>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    signup: builder.mutation<Token, Signup>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    me: builder.query<User, void>({
      query: () => `/auth/me`,
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useMeQuery } =
  usersApiSlice;
