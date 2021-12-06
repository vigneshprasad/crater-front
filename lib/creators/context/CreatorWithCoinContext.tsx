import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Creator } from "../types/creator";

export interface ICreatorWithCoinState {
  creators?: Creator[];
  loading: boolean;
  error?: unknown;
}

export const CreatorWithCoinContext = createContext(
  {} as ICreatorWithCoinState
);

type IProviderProps = PropsWithChildren<{
  initial?: Creator[];
}>;

export function CreatorWithCoinProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: creators, error } = useSWR<Creator[]>(
    API_URL_CONSTANTS.creator.withCoins,
    { initialData: initial }
  );

  const value = useMemo(
    () => ({ creators, error, loading: !creators && !error }),
    [creators, error]
  );

  return <CreatorWithCoinContext.Provider value={value} {...rest} />;
}

export default function useCreatorWithCoin(): ICreatorWithCoinState {
  const context = useContext(CreatorWithCoinContext);

  if (!context) {
    throw new Error("Please use CreatorWithRewardsProvider in tree.");
  }

  return context;
}
