import {
  createContext,
  PropsWithChildren,
  useMemo,
  useContext,
  useState,
} from "react";
import { SWRInfiniteResponse, SWRResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";

import { CreatorRank } from "../types/creator";

interface ICreatorRankListState {
  creators?: CreatorRank[];
  error?: unknown;
  isValidating: boolean;
  nextPage: boolean;
  category?: number;
  revalidate: SWRResponse<PageResponse<CreatorRank>, unknown>["revalidate"];
  setCreatorsPage: SWRInfiniteResponse<
    PageResponse<CreatorRank>,
    unknown
  >["setSize"];
}

const CreatorRankListContext = createContext({} as ICreatorRankListState);

type ProviderProps = PropsWithChildren<{
  initial?: PageResponse<CreatorRank>;
  page_size?: number;
  category?: number;
}>;

export function CreatorRankListProvider({
  initial,
  page_size: initialPageSize = 10,
  category,
  children,
}: ProviderProps): JSX.Element {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [nextPage, setNextPage] = useState(initial?.next ? true : false);

  const {
    data: creators,
    error,
    isValidating,
    revalidate,
    setSize: setCreatorsPage,
  } = useSWRInfinite<PageResponse<CreatorRank>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      if (category) {
        return `${API_URL_CONSTANTS.creator.getCreatorRankList}?page_size=${pageSize}&page=${page}&category=${category}`;
      }

      return `${API_URL_CONSTANTS.creator.getCreatorRankList}?page_size=${pageSize}&page=${page}`;
    },
    async (key: string) => {
      const response = await fetcher<PageResponse<CreatorRank>>(key);
      !response.next ? setNextPage(false) : setNextPage(true);
      return response;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value = useMemo(
    () => ({
      creators: creators?.flatMap((page) => page.results),
      error,
      isValidating,
      nextPage,
      category,
      revalidate,
      setCreatorsPage,
      setPageSize,
    }),
    [
      creators,
      isValidating,
      error,
      nextPage,
      category,
      revalidate,
      setCreatorsPage,
      setPageSize,
    ]
  );
  return (
    <CreatorRankListContext.Provider value={value}>
      {children}
    </CreatorRankListContext.Provider>
  );
}

export default function useCreatorRankList(): ICreatorRankListState {
  const context = useContext(CreatorRankListContext);

  if (!context) {
    throw new Error("Please use CreatorRankListProvider in tree.");
  }

  return context;
}
