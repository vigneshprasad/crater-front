import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { FollowerGrowth } from "../types/creator";

interface IFollowerGrowthState {
  followerGrowth?: number;
  error?: unknown;
  loading: boolean;
}

export const FollowerGrowthContext = createContext({} as IFollowerGrowthState);

type IProviderProps = PropsWithChildren<{
  initial?: FollowerGrowth;
}>;

export function FollowerGrowthProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data, error } = useSWR<FollowerGrowth>(
    API_URL_CONSTANTS.analytics.getFollowerGrowth,
    {
      initialData: initial,
    }
  );

  const value: IFollowerGrowthState = useMemo(
    () => ({
      followerGrowth: data?.percentage,
      error,
      loading: !data && !error,
    }),
    [data, error]
  );

  return <FollowerGrowthContext.Provider value={value} {...rest} />;
}

export function useFollowerGrowth(): IFollowerGrowthState {
  const context = useContext(FollowerGrowthContext);

  if (!context) {
    throw new Error("Please use FollowerGrowthProvider in tree.");
  }

  return context;
}
