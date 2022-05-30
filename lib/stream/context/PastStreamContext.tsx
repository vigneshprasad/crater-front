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
import { PastStreamListItem } from "@/community/types/community";

export interface IPastStreamState {
  streams?: PastStreamListItem[];
  error?: unknown;
  loading: boolean;
  setPastStreamsPage: SWRInfiniteResponse<
    PageResponse<PastStreamListItem>,
    unknown
  >["setSize"];
  nextPage?: boolean;
  category?: number;
}

export const PastStreamContext = createContext({} as IPastStreamState);

type IProviderProps = PropsWithChildren<{
  host?: string;
  initial?: PageResponse<PastStreamListItem>;
  pageSize?: number;
  categoryFilter?: number;
}>;

export function PastStreamProvider({
  host,
  initial,
  pageSize = 10,
  categoryFilter,
  ...rest
}: IProviderProps): JSX.Element {
  const [nextPage, setNextPage] = useState(false);
  const {
    data: streams,
    error,
    setSize: setPastStreamsPage,
  } = useSWRInfinite<PageResponse<PastStreamListItem>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      if (host) {
        return `${API_URL_CONSTANTS.groups.getPastWebinars}?host=${host}&page=${page}&page_size=${pageSize}`;
      }

      if (categoryFilter) {
        return `${API_URL_CONSTANTS.groups.getPastWebinars}?categories=${categoryFilter}&page=${page}&page_size=${pageSize}`;
      }

      return `${API_URL_CONSTANTS.groups.getPastWebinars}?page=${page}&page_size=${pageSize}`;
    },
    async (key: string) => {
      const response = await fetcher<PageResponse<PastStreamListItem>>(key);
      !response.next ? setNextPage(false) : setNextPage(true);
      return response;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: IPastStreamState = useMemo(
    () => ({
      streams: streams?.flatMap((page) => page.results),
      error,
      loading: !streams && !error,
      setPastStreamsPage,
      nextPage,
      category: categoryFilter,
    }),
    [streams, error, setPastStreamsPage, nextPage, categoryFilter]
  );

  return <PastStreamContext.Provider value={value} {...rest} />;
}

export default function usePastStreams(): IPastStreamState {
  const context = useContext(PastStreamContext);

  if (!context) {
    throw new Error("You need to wrap PastStreamProvider.");
  }

  return context;
}
