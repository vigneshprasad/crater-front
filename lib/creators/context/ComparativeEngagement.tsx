import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { ComparativeEngagement } from "../types/creator";

interface IComparativeEngagementState {
  comparativeEngagement?: number;
  error?: unknown;
  loading: boolean;
}

export const ComparativeEngagementContext = createContext(
  {} as IComparativeEngagementState
);

type IProviderProps = PropsWithChildren<{
  initial?: ComparativeEngagement;
}>;

export function ComparativeEngagementProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data, error } = useSWR<ComparativeEngagement>(
    API_URL_CONSTANTS.analytics.getComparativeEngagement,
    {
      initialData: initial,
    }
  );

  const value: IComparativeEngagementState = useMemo(
    () => ({
      comparativeEngagement: data?.percentage,
      error,
      loading: !data && !error,
    }),
    [data, error]
  );

  return <ComparativeEngagementContext.Provider value={value} {...rest} />;
}

export function useComparativeEngagement(): IComparativeEngagementState {
  const context = useContext(ComparativeEngagementContext);

  if (!context) {
    throw new Error("Please use ComparativeEngagementProvider in tree.");
  }

  return context;
}
