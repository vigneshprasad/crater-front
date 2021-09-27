import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";

import { Creator } from "../types/creator";

interface ICreatorListState {
  creators?: Creator[];
  error?: unknown;
  loading: boolean;
  setCreatorsPage: SWRInfiniteResponse<
    PageResponse<Creator>,
    unknown
  >["setSize"];
}

export const CreatorsListContext = createContext({} as ICreatorListState);

type IProviderProps = PropsWithChildren<{
  initial: PageResponse<Creator>;
  pageSize?: number;
}>;

export function CreatorListProvider({
  initial,
  pageSize = 10,
  ...rest
}: IProviderProps): JSX.Element {
  const {
    data: creators,
    error,
    setSize: setCreatorsPage,
  } = useSWRInfinite<PageResponse<Creator>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;
      return `${API_URL_CONSTANTS.creator.getCreatorList}?page=${page}&page_size=${pageSize}&certified=true`;
    },
    {
      initialData: [initial],
    }
  );

  const value: ICreatorListState = useMemo(
    () => ({
      creators: creators?.flatMap((page) => page.results),
      error,
      loading: !creators && !error,
      setCreatorsPage,
    }),
    [creators, error, setCreatorsPage]
  );

  return <CreatorsListContext.Provider value={value} {...rest} />;
}

export function useCreatorsList(): ICreatorListState {
  const context = useContext(CreatorsListContext);

  if (!context) {
    throw new Error("Please use CreatorListProvider in tree.");
  }

  return context;
}
