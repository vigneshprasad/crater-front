import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Challenge } from "../types/leaderboard";

interface IChallengeListState {
  loading: boolean;
  challenges?: Challenge[];
  error?: unknown;
}

export const ChallegeListContext = createContext({} as IChallengeListState);

type ProviderProps = PropsWithChildren<{
  initial?: Challenge[];
}>;

export function ChallengeListProvider({
  initial,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: challenges, error } = useSWR<Challenge[]>(
    API_URL_CONSTANTS.leaderboard.getChallengeList,
    { initialData: initial }
  );

  const value = useMemo(
    () => ({
      challenges,
      loading: !challenges && !error,
      error,
    }),
    [challenges, error]
  );
  return <ChallegeListContext.Provider value={value} {...rest} />;
}

export default function useChallengesList(): IChallengeListState {
  const context = useContext(ChallegeListContext);

  if (!context) {
    throw Error("Please use ChallengeListProvider in tree");
  }

  return context;
}
