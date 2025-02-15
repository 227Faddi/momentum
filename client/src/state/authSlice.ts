import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../types";
import type { RootState } from "./store";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: localStorage.getItem("refresh"),
  } as AuthState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    setTokens: (
      state,
      {
        payload,
      }: PayloadAction<Partial<{ accessToken: string; refreshToken: string }>>
    ) => {
      if (payload.accessToken !== undefined) {
        state.accessToken = payload.accessToken;
      }
      if (payload.refreshToken !== undefined) {
        localStorage.setItem("refresh", payload.refreshToken);
        state.refreshToken = payload.refreshToken;
      }
    },
    logout: (state) => {
      localStorage.removeItem("refresh");
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setTokens, setUser, logout } = slice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentAccessToken = (state: RootState) =>
  state.auth.accessToken;
export const selectCurrentRefreshToken = (state: RootState) =>
  state.auth.refreshToken;

export default slice.reducer;
