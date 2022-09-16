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

interface IPastStreamsSearchState {
  streams?: StreamListItem[];
  error?: unknown;
  nextPage: boolean;
  isValidating: boolean;
  setPastStreamsSearchPage: SWRInfiniteResponse<
    PageResponse<StreamListItem>,
    unknown
  >["setSize"];
  setPageSize: Dispatch<SetStateAction<number>>;
}

export const PastStreamsSearchContext = createContext(
  {} as IPastStreamsSearchState
);

type IProviderProps = PropsWithChildren<{
  initial?: PageResponse<StreamListItem>;
  pageSize?: number;
  search?: string;
}>;

export function PastStreamsSearchProvider({
  initial,
  pageSize: intialPageSize = 5,
  search = "",
  ...rest
}: IProviderProps): JSX.Element {
  const [pageSize, setPageSize] = useState(intialPageSize);
  const [nextPage, setNextPage] = useState(initial?.next ? true : false);
  const {
    data: streams,
    error,
    setSize: setPastStreamsSearchPage,
    isValidating,
  } = useSWRInfinite<PageResponse<StreamListItem>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      return `${API_URL_CONSTANTS.search.getPastStreams}?page=${page}&page_size=${pageSize}&search=${search}`;
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

  const value: IPastStreamsSearchState = useMemo(
    () => ({
      streams: streams?.flatMap((page) => page.results),
      error,
      nextPage,
      isValidating,
      setPastStreamsSearchPage,
      setPageSize,
    }),
    [
      streams,
      error,
      nextPage,
      isValidating,
      setPastStreamsSearchPage,
      setPageSize,
    ]
  );

  return <PastStreamsSearchContext.Provider value={value} {...rest} />;
}

export default function usePastStreamsSearchList(): IPastStreamsSearchState {
  const context = useContext(PastStreamsSearchContext);

  if (!context) {
    throw new Error("You need to wrap PastStreamsSearchProvider.");
  }

  return context;
}
