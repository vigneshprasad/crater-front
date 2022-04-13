import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Leaderboard } from "../types/leaderboard";

interface ILeaderboardListState {
  loading: boolean;
  leaderboards?: Leaderboard[];
  error?: unknown;
}

export const LeaderboardListContext = createContext(
  {} as ILeaderboardListState
);

type ProviderProps = PropsWithChildren<{
  initial?: Leaderboard[];
  filterChallenge?: string | number;
}>;

export function LeaderboardListProvider({
  initial,
  filterChallenge,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: leaderboards, error } = useSWR<Leaderboard[]>(
    filterChallenge
      ? `${API_URL_CONSTANTS.leaderboard.getLeaderboardList}?challenge=${filterChallenge}`
      : null,
    {
      initialData: initial,
    }
  );

  const value = useMemo(
    () => ({ leaderboards, error, loading: !leaderboards && !error }),
    [leaderboards, error]
  );
  return <LeaderboardListContext.Provider value={value} {...rest} />;
}

export default function useLeaderboardList(): ILeaderboardListState {
  const context = useContext(LeaderboardListContext);
  if (!context) {
    throw new Error(
      "useLeaderboardList must be used within a LeaderboardListProvider"
    );
  }
  return context;
}
