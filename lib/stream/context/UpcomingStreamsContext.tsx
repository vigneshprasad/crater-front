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
  category?: number;
}>;

export function UpcomingStreamsProvider({
  host,
  initial,
  pageSize = 4,
  category,
  ...rest
}: IProviderProps): JSX.Element {
  const [nextPage, setNextPage] = useState(false);
  const {
    data: streams,
    error,
    setSize: setUpcomingStreamsPage,
    mutate: mutateUpcomingStreams,
  } = useSWRInfinite<PageResponse<Webinar>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      if (category) {
        return `${API_URL_CONSTANTS.groups.getUpcominWebinars}?categories=${category}&page=${page}&page_size=${pageSize}`;
      }
      if (host) {
        return `${API_URL_CONSTANTS.groups.getUpcominWebinars}?host=${host}&page=${page}&page_size=${pageSize}`;
      }

      return `${API_URL_CONSTANTS.groups.getUpcominWebinars}?page=${page}&page_size=${pageSize}`;
    },
    async (key: string) => {
      const response = await fetcher<PageResponse<Webinar>>(key);
      !response.next ? setNextPage(false) : setNextPage(true);
      return response;
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
      nextPage,
      setUpcomingStreamsPage,
      mutateUpcomingStreams,
    }),
    [streams, error, nextPage, setUpcomingStreamsPage, mutateUpcomingStreams]
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
