import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { TopStreams } from "../types/stream";

interface ITopStreamsState {
  topStreams?: TopStreams[];
  error?: unknown;
  loading: boolean;
}

export const TopStreamsContext = createContext({} as ITopStreamsState);

type IProviderProps = PropsWithChildren<{
  initial?: TopStreams[];
}>;

export function TopStreamsProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: topStreams, error } = useSWR<TopStreams[]>(
    API_URL_CONSTANTS.analytics.getMyTopStreams,
    { initialData: initial }
  );

  const value: ITopStreamsState = useMemo(
    () => ({
      topStreams,
      error,
      loading: !topStreams && !error,
    }),
    [topStreams, error]
  );

  return <TopStreamsContext.Provider value={value} {...rest} />;
}

export function useTopStreams(): ITopStreamsState {
  const context = useContext(TopStreamsContext);

  if (!context) {
    throw new Error("Please use TopStreamsProvider in tree.");
  }

  return context;
}
