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

interface IUpcomingStreamsSearchState {
  streams?: StreamListItem[];
  error?: unknown;
  nextPage: boolean;
  isValidating: boolean;
  setUpcomingStreamsSearchPage: SWRInfiniteResponse<
    PageResponse<StreamListItem>,
    unknown
  >["setSize"];
  setPageSize: Dispatch<SetStateAction<number>>;
}

export const UpcomingStreamsSearchContext = createContext(
  {} as IUpcomingStreamsSearchState
);

type IProviderProps = PropsWithChildren<{
  initial?: PageResponse<StreamListItem>;
  pageSize?: number;
  search?: string;
}>;

export function UpcomingStreamsSearchProvider({
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
    setSize: setUpcomingStreamsSearchPage,
    isValidating,
  } = useSWRInfinite<PageResponse<StreamListItem>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      return `${API_URL_CONSTANTS.search.getUpcomingStreams}?page=${page}&page_size=${pageSize}&search=${search}`;
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

  const value: IUpcomingStreamsSearchState = useMemo(
    () => ({
      streams: streams?.flatMap((page) => page.results),
      error,
      nextPage,
      isValidating,
      setUpcomingStreamsSearchPage,
      setPageSize,
    }),
    [
      streams,
      error,
      nextPage,
      isValidating,
      setUpcomingStreamsSearchPage,
      setPageSize,
    ]
  );

  return <UpcomingStreamsSearchContext.Provider value={value} {...rest} />;
}

export default function useUpcomingStreamsSearchList(): IUpcomingStreamsSearchState {
  const context = useContext(UpcomingStreamsSearchContext);

  if (!context) {
    throw new Error("You need to wrap UpcomingStreamsSearchProvider.");
  }

  return context;
}
