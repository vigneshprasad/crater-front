import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";
import { Webinar } from "@/community/types/community";

interface ILiveStreamsState {
  liveStreams?: Webinar[];
  error?: unknown;
  loading: boolean;
  nextPage: boolean;
  setFeaturedStreamPage: SWRInfiniteResponse<Webinar[], unknown>["setSize"];
}

export const LiveStreamsContext = createContext({} as ILiveStreamsState);

export type IStreamsProviderProps = PropsWithChildren<{
  initial?: Webinar[];
  pageSize?: number;
}>;

export function LiveStreamsProvider({
  initial,
  pageSize = 10,
  ...rest
}: IStreamsProviderProps): JSX.Element {
  const [nextPage, setNextPage] = useState(false);
  const {
    data: liveStreams,
    error,
    setSize: setFeaturedStreamPage,
  } = useSWRInfinite<Webinar[]>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.length) return null;
      return `${API_URL_CONSTANTS.groups.getAllLiveWebinars}?page=${page}&page_size=${pageSize}`;
    },
    async (key: string) => {
      const response = await fetcher<PageResponse<Webinar>>(key);
      !response.next ? setNextPage(false) : setNextPage(true);
      return response.results;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );
  const value: ILiveStreamsState = useMemo(
    () => ({
      liveStreams: liveStreams?.flat(),
      error,
      loading: !liveStreams && !error,
      nextPage,
      setFeaturedStreamPage,
    }),
    [liveStreams, error, nextPage, setFeaturedStreamPage]
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
