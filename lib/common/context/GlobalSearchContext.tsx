import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR, { useSWRInfinite } from "swr";

import { StreamListItem } from "@/community/types/community";
import { CreatorListItem } from "@/creators/types/creator";
import { StreamCategory } from "@/creators/types/stream";

import { API_URL_CONSTANTS } from "../constants/url.constants";
import { PageResponse } from "../types/api";

interface IGlobalSearchState {
  upcomingStreams?: StreamListItem[];
  pastStreams?: StreamListItem[];
  creators?: CreatorListItem[];
  streamCategories?: StreamCategory[];
}

export const GlobalSearchContext = createContext({} as IGlobalSearchState);

type IProviderProps = PropsWithChildren<{
  search?: string;
  pageSize?: number;
}>;

export function GlobalSearchProvider({
  search = "",
  pageSize = 8,
  ...rest
}: IProviderProps): JSX.Element {
  // Upcoming Streams Search
  const { data: upcomingStreams } = useSWRInfinite<
    PageResponse<StreamListItem>
  >((index, previousData) => {
    const page = index + 1;
    if (previousData && !previousData.next) return null;

    return `${API_URL_CONSTANTS.search.getUpcomingStreams}?page=${page}&page_size=${pageSize}&search=${search}`;
  });

  // Past Streams Search
  const { data: pastStreams } = useSWRInfinite<PageResponse<StreamListItem>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      return `${API_URL_CONSTANTS.search.getPastStreams}?page=${page}&page_size=${pageSize}&search=${search}`;
    }
  );

  // Creators Search
  const { data: creators } = useSWRInfinite<PageResponse<CreatorListItem>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      return `${API_URL_CONSTANTS.search.getCreators}?page=${page}&page_size=${pageSize}&search=${search}`;
    }
  );

  // Stream Categories Search
  const { data: streamCategories } = useSWR<StreamCategory[]>(
    `${API_URL_CONSTANTS.search.getStreamCategories}?search=${search}`
  );

  const value: IGlobalSearchState = useMemo(
    () => ({
      upcomingStreams: upcomingStreams?.flatMap((page) => page.results),
      pastStreams: pastStreams?.flatMap((page) => page.results),
      creators: creators?.flatMap((page) => page.results),
      streamCategories,
    }),
    [creators, pastStreams, streamCategories, upcomingStreams]
  );

  return <GlobalSearchContext.Provider value={value} {...rest} />;
}

export default function useGlobalSearch(): IGlobalSearchState {
  const context = useContext(GlobalSearchContext);

  if (!context) {
    throw new Error("You need to wrap GlobalSearchProvider.");
  }

  return context;
}
