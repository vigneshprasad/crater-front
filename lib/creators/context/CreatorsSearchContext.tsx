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

import { CreatorListItem } from "../types/creator";

interface ICreatorsSearchState {
  creators?: CreatorListItem[];
  error?: unknown;
  nextPage: boolean;
  isValidating: boolean;
  setCreatorsSearchPage: SWRInfiniteResponse<
    PageResponse<CreatorListItem>,
    unknown
  >["setSize"];
  setPageSize: Dispatch<SetStateAction<number>>;
}

export const CreatorsSearchContext = createContext({} as ICreatorsSearchState);

type IProviderProps = PropsWithChildren<{
  initial?: PageResponse<CreatorListItem>;
  pageSize?: number;
  search?: string;
}>;

export function CreatorsSearchProvider({
  initial,
  pageSize: intialPageSize = 8,
  search = "",
  ...rest
}: IProviderProps): JSX.Element {
  const [pageSize, setPageSize] = useState(intialPageSize);
  const [nextPage, setNextPage] = useState(initial?.next ? true : false);
  const {
    data: creators,
    error,
    setSize: setCreatorsSearchPage,
    isValidating,
  } = useSWRInfinite<PageResponse<CreatorListItem>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      return `${API_URL_CONSTANTS.search.getCreators}?page=${page}&page_size=${pageSize}&search=${search}`;
    },
    async (key: string) => {
      const response = await fetcher<PageResponse<CreatorListItem>>(key);
      !response.next ? setNextPage(false) : setNextPage(true);
      return response;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: ICreatorsSearchState = useMemo(
    () => ({
      creators: creators?.flatMap((page) => page.results),
      error,
      nextPage,
      isValidating,
      setCreatorsSearchPage,
      setPageSize,
    }),
    [
      creators,
      error,
      nextPage,
      isValidating,
      setCreatorsSearchPage,
      setPageSize,
    ]
  );

  return <CreatorsSearchContext.Provider value={value} {...rest} />;
}

export default function useCreatorsSearchList(): ICreatorsSearchState {
  const context = useContext(CreatorsSearchContext);

  if (!context) {
    throw new Error("You need to wrap CreatorsSearchProvider.");
  }

  return context;
}
