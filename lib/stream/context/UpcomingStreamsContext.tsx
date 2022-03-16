import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import { Webinar } from "@/community/types/community";

interface IUpcomingStreamsState {
  upcoming?: Webinar[];
  error?: unknown;
  loading: boolean;
  nextPage: boolean;
  setUpcomingStreamsPage: SWRInfiniteResponse<
    PageResponse<Webinar>,
    unknown
  >["setSize"];
  mutateUpcomingStreams: SWRInfiniteResponse<
    PageResponse<Webinar>,
    unknown
  >["mutate"];
}

export const UpcomingStreamsContext = createContext(
  {} as IUpcomingStreamsState
);

type IProviderProps = PropsWithChildren<{
  host?: string;
  initial?: PageResponse<Webinar>;
  pageSize?: number;
}>;

export function UpcomingStreamsProvider({
  host,
  initial,
  pageSize = 10,
  ...rest
}: IProviderProps): JSX.Element {
  const {
    data: streams,
    error,
    setSize: setUpcomingStreamsPage,
    mutate: mutateUpcomingStreams,
  } = useSWRInfinite<PageResponse<Webinar>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      return host
        ? `${API_URL_CONSTANTS.groups.getUpcominWebinars}?host=${host}&page=${page}&page_size=${pageSize}`
        : `${API_URL_CONSTANTS.groups.getUpcominWebinars}?page=${page}&page_size=${pageSize}`;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: IUpcomingStreamsState = useMemo(
    () => ({
      upcoming: streams?.flatMap((page) => page.results),
      error,
      loading: !streams && !error,
      nextPage:
        streams && streams[streams.length - 1]?.next === null ? false : true,
      setUpcomingStreamsPage,
      mutateUpcomingStreams,
    }),
    [streams, error, setUpcomingStreamsPage, mutateUpcomingStreams]
  );

  return <UpcomingStreamsContext.Provider value={value} {...rest} />;
}

export default function useUpcomingStreams(): IUpcomingStreamsState {
  const context = useContext(UpcomingStreamsContext);

  if (!context) {
    throw new Error("You need to wrap UpcomingStreamProvider.");
  }

  return context;
}
