import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout, setTokens } from "../state/authSlice";
import { RootState } from "../state/store";

const serverUrl = import.meta.env.VITE_SERVER_URL;

console.log(serverUrl);

interface ExtraOptions {
  isRefresh: boolean;
}

const baseQuery = fetchBaseQuery({
  baseUrl: serverUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState, extraOptions }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;
    const refreshToken = state.auth.refreshToken;
    if ((extraOptions as ExtraOptions)?.isRefresh) {
      headers.set("authorization", `Bearer ${refreshToken}`);
    } else if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

interface RefreshResponse {
  accessToken: string;
}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);
  const status = result?.error?.status;
  if (status === 403 || status === 401) {
    const refreshResult = await baseQuery("/auth/refresh", api, {
      isRefresh: true,
    });
    if (refreshResult?.data) {
      api.dispatch(
        setTokens({
          accessToken: (refreshResult.data as RefreshResponse).accessToken,
        })
      );
      result = await baseQuery(args, api, extra);
    } else {
      localStorage.removeItem("refresh");
      api?.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Goals", "User", "Leaderboard"],
  endpoints: () => ({}),
});
