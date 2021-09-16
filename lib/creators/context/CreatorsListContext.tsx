import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";

import { Creator } from "../types/creator";

interface ICreatorListState {
  creators?: Creator[];
  error?: unknown;
  loading: boolean;
  setCreatorsPage: SWRInfiniteResponse<Creator[], unknown>["setSize"];
}

export const CreatorsListContext = createContext({} as ICreatorListState);

type IProviderProps = PropsWithChildren<{
  initial: Creator[];
}>;

export function CreatorListProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const {
    data: creators,
    error,
    setSize: setCreatorsPage,
  } = useSWRInfinite<Creator[]>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.length) return null;
      return `${API_URL_CONSTANTS.creator.getCreatorList}?page=${page}&certified=true`;
    },
    async (key: string) => {
      return (await fetcher<PageResponse<Creator>>(key)).results;
    },
    {
      initialData: [[...initial]],
    }
  );

  const value: ICreatorListState = useMemo(
    () => ({
      creators: creators?.flat(),
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
