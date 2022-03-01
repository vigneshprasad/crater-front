import { createContext, PropsWithChildren, useMemo, useContext } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Coin } from "../types/token";

export interface ICreatorCoinState {
  coin?: Coin;
  loading: boolean;
  error?: unknown;
}

export const CreatorCoinContext = createContext({} as ICreatorCoinState);

type ProviderProps = PropsWithChildren<{
  creatorId: string | number;
  initial?: Coin;
}>;

export function CreatorCoinProvider({
  creatorId,
  initial,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: coin, error } = useSWR<Coin>(
    API_URL_CONSTANTS.coins.getCointForCreator(creatorId),
    { initialData: initial }
  );

  const value = useMemo(
    () => ({
      coin,
      error,
      loading: !coin && !error,
    }),
    [coin, error]
  );
  return <CreatorCoinContext.Provider value={value} {...rest} />;
}

export default function useCreatorCoin(): ICreatorCoinState {
  const context = useContext(CreatorCoinContext);

  if (!context) {
    throw new Error("Please use CreatorCoinProvider in tree.");
  }

  return context;
}
