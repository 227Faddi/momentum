import type { Goal, User } from "../types";
import { apiSlice } from "./index";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    goals: builder.query<Goal[], void>({
      query: () => `/api/goals`,
      providesTags: ["Goals"],
    }),
    addGoal: builder.mutation<unknown, Partial<Goal>>({
      query: (data) => ({
        url: `/api/goals`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Goals"],
    }),
    completeGoal: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/api/goals/${id}/complete`,
        method: "PUT",
      }),
      invalidatesTags: ["Goals", "User", "Leaderboard"],
    }),
    deleteGoal: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/api/goals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Goals"],
    }),
    leaderboard: builder.query<Partial<User[]>, void>({
      query: () => `/api/goals/leaderboard`,
      providesTags: ["Leaderboard"],
    }),
  }),
});

export const {
  useGoalsQuery,
  useAddGoalMutation,
  useCompleteGoalMutation,
  useDeleteGoalMutation,
  useLeaderboardQuery,
} = usersApiSlice;
