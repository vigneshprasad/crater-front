import { createContext, PropsWithChildren, useMemo, useContext } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { CreatorRank } from "../types/creator";

interface ICreatorRankListState {
  creators?: CreatorRank[];
  error?: unknown;
  isValidating: boolean;
  revalidate: SWRResponse<CreatorRank[], unknown>["revalidate"];
}

const CreatorRankListContext = createContext({} as ICreatorRankListState);

type ProviderProps = PropsWithChildren<{
  initial?: CreatorRank[];
}>;

export function CreatorRankListProvider({
  children,
}: ProviderProps): JSX.Element {
  const {
    data: creators,
    error,
    isValidating,
    revalidate,
  } = useSWR<CreatorRank[]>(API_URL_CONSTANTS.creator.getCreatorRankList);

  const value = useMemo(
    () => ({
      creators,
      error,
      isValidating,
      revalidate,
    }),
    [creators, isValidating, error, revalidate]
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
