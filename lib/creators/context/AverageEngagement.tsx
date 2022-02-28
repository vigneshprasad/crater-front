import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { AverageEngagement } from "../types/creator";

interface IAverageEngagementState {
  averageEngagement?: number;
  error?: unknown;
  loading: boolean;
}

export const AverageEngagementContext = createContext(
  {} as IAverageEngagementState
);

type IProviderProps = PropsWithChildren<{
  initial?: AverageEngagement;
}>;

export function AverageEngagementProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data, error } = useSWR<AverageEngagement>(
    API_URL_CONSTANTS.analytics.getAverageEngagement,
    {
      initialData: initial,
    }
  );

  const value: IAverageEngagementState = useMemo(
    () => ({
      averageEngagement: data?.count,
      error,
      loading: !data && !error,
    }),
    [data, error]
  );

  return <AverageEngagementContext.Provider value={value} {...rest} />;
}

export function useAverageEngagement(): IAverageEngagementState {
  const context = useContext(AverageEngagementContext);

  if (!context) {
    throw new Error("Please use AverageEngagementProvider in tree.");
  }

  return context;
}
