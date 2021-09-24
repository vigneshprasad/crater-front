import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";
import { Webinar } from "@/community/types/community";

interface ILiveStreamsState {
  liveStreams?: Webinar[];
  error?: unknown;
  loading: boolean;
  setFeaturedStreamPage: SWRInfiniteResponse<Webinar[], unknown>["setSize"];
}

export const LiveStreamsContext = createContext({} as ILiveStreamsState);

export type IStreamsProviderProps = PropsWithChildren<{
  initial?: Webinar[];
}>;

export function LiveStreamsProvider({
  initial,
  ...rest
}: IStreamsProviderProps): JSX.Element {
  const {
    data: liveStreams,
    error,
    setSize: setFeaturedStreamPage,
  } = useSWRInfinite<Webinar[]>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.length) return null;
      return `${API_URL_CONSTANTS.groups.getAllLiveWebinars}?page=${page}`;
    },
    async (key: string) => {
      return (await fetcher<PageResponse<Webinar>>(key)).results;
    },
    {
      initialData: [[...(initial ? [...initial] : [])]],
    }
  );
  const value: ILiveStreamsState = useMemo(
    () => ({
      liveStreams: liveStreams?.flat(),
      error,
      loading: !liveStreams && !error,
      setFeaturedStreamPage,
    }),
    [liveStreams, error, setFeaturedStreamPage]
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
