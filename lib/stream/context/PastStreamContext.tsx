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
  categorySlug?: string;
}

export const PastStreamContext = createContext({} as IPastStreamState);

type IProviderProps = PropsWithChildren<{
  host?: string;
  initial?: PageResponse<PastStreamListItem>;
  pageSize?: number;
  categoryFilter?: number;
  categorySlug?: string;
}>;

export function PastStreamProvider({
  host,
  initial,
  pageSize = 10,
  categoryFilter,
  categorySlug,
  ...rest
}: IProviderProps): JSX.Element {
  const [nextPage, setNextPage] = useState(initial?.next ? true : false);
  const {
    data: streams,
    error,
    setSize: setPastStreamsPage,
  } = useSWRInfinite<PageResponse<PastStreamListItem>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      let url = `${API_URL_CONSTANTS.groups.getPastWebinars}?page=${page}&page_size=${pageSize}`;

      if (host) {
        url += `&host=${host}`;
      }
      if (categoryFilter) {
        url += `&categories=${categoryFilter}`;
      }
      if (categorySlug) {
        url += `&category=${categorySlug}`;
      }

      return url;
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
      categorySlug,
    }),
    [streams, error, setPastStreamsPage, nextPage, categoryFilter, categorySlug]
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
