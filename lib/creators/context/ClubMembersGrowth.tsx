import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { ClubMembersGrowth } from "../types/creator";

interface IClubMembersGrowthState {
  clubMembersGrowth?: ClubMembersGrowth[];
  error?: unknown;
  loading: boolean;
}

export const ClubMembersGrowthContext = createContext(
  {} as IClubMembersGrowthState
);

type IProviderProps = PropsWithChildren<{
  initial?: ClubMembersGrowth[];
}>;

export function ClubMembersGrowthProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: clubMembersGrowth, error } = useSWR<ClubMembersGrowth[]>(
    API_URL_CONSTANTS.analytics.getClubMembersGrowth,
    { initialData: initial }
  );

  const value: IClubMembersGrowthState = useMemo(
    () => ({
      clubMembersGrowth,
      error,
      loading: !clubMembersGrowth && !error,
    }),
    [clubMembersGrowth, error]
  );

  return <ClubMembersGrowthContext.Provider value={value} {...rest} />;
}

export function useClubMembersGrowth(): IClubMembersGrowthState {
  const context = useContext(ClubMembersGrowthContext);

  if (!context) {
    throw new Error("Please use ClubMembersGrowthProvider in tree.");
  }

  return context;
}
