import type { Goal } from "../../types";
import { apiSlice } from "./index";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    goals: builder.query<Goal, void>({
      query: () => `/api/goals`,
    }),
    addGoal: builder.mutation({
      query: (data) => ({
        url: `/api/goals`,
        method: "POST",
        body: data,
      }),
    }),
    completeGoal: builder.mutation({
      query: (data) => ({
        url: `/api/goals/${data.id}/complete`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteGoal: builder.mutation({
      query: (data) => ({
        url: `/api/goals/${data.id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGoalsQuery,
  useAddGoalMutation,
  useCompleteGoalMutation,
  useDeleteGoalMutation,
} = usersApiSlice;
