import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { UserLeaderboard } from "../types/leaderboard";

interface IUserLeaderboardListState {
  users?: UserLeaderboard[];
  error?: unknown;
  loading: boolean;
}

export const UserLeaderboardListContext = createContext(
  {} as IUserLeaderboardListState
);

type ProviderProps = PropsWithChildren<{
  initial?: UserLeaderboard[];
  filterLeaderboard?: string | number;
}>;

export function UserLeaderboardListProvider({
  initial,
  filterLeaderboard,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: users, error } = useSWR<UserLeaderboard[]>(
    filterLeaderboard
      ? `${API_URL_CONSTANTS.leaderboard.getUserLeaderboardList}?leaderboard=${filterLeaderboard}`
      : null,
    { initialData: initial }
  );

  const value = useMemo(
    () => ({ users, error, loading: !users && !error }),
    [users, error]
  );
  return <UserLeaderboardListContext.Provider value={value} {...rest} />;
}

export default function useUserLeaderboardsList(): IUserLeaderboardListState {
  const context = useContext(UserLeaderboardListContext);

  if (!context) {
    throw Error("Please use UserLeaderboardListProvider in tree");
  }

  return context;
}
