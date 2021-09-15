import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSwr from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Webinar } from "@/creators/types/community";

interface ILiveStreamsState {
  liveStreams?: Webinar[];
  error?: unknown;
  loading: boolean;
}

export const LiveStreamsContext = createContext({} as ILiveStreamsState);

export type IStreamsProviderProps = PropsWithChildren<{
  initial?: Webinar[];
}>;

export function LiveStreamsProvider({
  initial,
  ...rest
}: IStreamsProviderProps): JSX.Element {
  const { data: liveStreams, error } = useSwr(
    API_URL_CONSTANTS.groups.getAllLiveWebinars,
    { initialData: initial }
  );
  const value: ILiveStreamsState = useMemo(
    () => ({
      liveStreams,
      error,
      loading: !liveStreams && !error,
    }),
    [liveStreams, error]
  );

  return <LiveStreamsContext.Provider value={value} {...rest} />;
}

export function useLiveStreams(): ILiveStreamsState {
  const context = useContext(LiveStreamsContext);

  if (!context) {
    throw new Error("Please use LiveStreamsProvider in tree.");
  }

  return context;
}
