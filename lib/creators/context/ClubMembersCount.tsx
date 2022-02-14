import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { ClubMembersCount } from "../types/creator";

interface IClubMembersCountState {
  clubMembersCount?: number;
  error?: unknown;
  loading: boolean;
}

export const ClubMembersCountContext = createContext(
  {} as IClubMembersCountState
);

type IProviderProps = PropsWithChildren<{
  initial?: ClubMembersCount;
}>;

export function ClubMembersCountProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data, error } = useSWR<ClubMembersCount>(
    API_URL_CONSTANTS.analytics.getMyClubMembersCount,
    {
      initialData: initial,
    }
  );

  const value: IClubMembersCountState = useMemo(
    () => ({
      clubMembersCount: data?.count,
      error,
      loading: !data && !error,
    }),
    [data, error]
  );

  return <ClubMembersCountContext.Provider value={value} {...rest} />;
}

export function useClubMembersCount(): IClubMembersCountState {
  const context = useContext(ClubMembersCountContext);

  if (!context) {
    throw new Error("Please use ClubMembersCountProvider in tree.");
  }

  return context;
}
