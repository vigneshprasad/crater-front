import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";
import { StreamListItem } from "@/community/types/community";

interface IMyUpcomingStreamsState {
  upcoming?: StreamListItem[];
  error?: unknown;
  loading: boolean;
  nextPage: boolean;
  sortBy?: string;
  setMyUpcomingStreamsPage: SWRInfiniteResponse<
    PageResponse<StreamListItem>,
    unknown
  >["setSize"];
  mutateMyUpcomingStreams: SWRInfiniteResponse<
    PageResponse<StreamListItem>,
    unknown
  >["mutate"];
  setPageSize: Dispatch<SetStateAction<number>>;
  category?: number;
}

export const MyUpcomingStreamsContext = createContext(
  {} as IMyUpcomingStreamsState
);

type IProviderProps = PropsWithChildren<{
  host?: string;
  initial?: PageResponse<StreamListItem>;
  pageSize?: number;
  sortBy?: string;
}>;

export function MyUpcomingStreamsProvider({
  initial,
  host,
  pageSize: intialPageSize = 10,
  sortBy,
  ...rest
}: IProviderProps): JSX.Element {
  const [pageSize, setPageSize] = useState(intialPageSize);
  const [nextPage, setNextPage] = useState(initial?.next ? true : false);
  const {
    data: streams,
    error,
    setSize: setMyUpcomingStreamsPage,
    mutate: mutateMyUpcomingStreams,
  } = useSWRInfinite<PageResponse<StreamListItem>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      if (!host) return null;

      const baseUrl = API_URL_CONSTANTS.stream.getMyUpcomingStreams;

      let url = `${baseUrl}?page=${page}&page_size=${pageSize}`;

      if (sortBy) {
        url += `&sort_by=${sortBy}`;
      }

      return url;
    },
    async (key: string) => {
      const response = await fetcher<PageResponse<StreamListItem>>(key);
      !response.next ? setNextPage(false) : setNextPage(true);
      return response;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: IMyUpcomingStreamsState = useMemo(
    () => ({
      upcoming: streams?.flatMap((page) => page.results),
      error,
      loading: !streams && !error,
      nextPage,
      setMyUpcomingStreamsPage,
      mutateMyUpcomingStreams,
      setPageSize,
      sortBy,
    }),
    [
      streams,
      error,
      nextPage,
      setMyUpcomingStreamsPage,
      mutateMyUpcomingStreams,
      setPageSize,
      sortBy,
    ]
  );

  return <MyUpcomingStreamsContext.Provider value={value} {...rest} />;
}

export default function useMyUpcomingStreams(): IMyUpcomingStreamsState {
  const context = useContext(MyUpcomingStreamsContext);

  if (!context) {
    throw new Error("You need to wrap MyUpcomingStreamsProvider.");
  }

  return context;
}
