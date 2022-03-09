import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { CoinHolding } from "../types/exchange";

interface ICoinHoldingListState {
  holdings?: CoinHolding[];
  loading: boolean;
  error?: unknown;
}

export const CoinHoldingListContext = createContext(
  {} as ICoinHoldingListState
);

type ProviderProps = PropsWithChildren<{
  initial?: CoinHolding[];
  filterUser?: string;
}>;

export function CoinHoldingListProvider({
  initial,
  filterUser,
  ...rest
}: ProviderProps): JSX.Element {
  const url = filterUser
    ? `${API_URL_CONSTANTS.exchange.coinHoldingsList}?user=${filterUser}`
    : API_URL_CONSTANTS.exchange.coinHoldingsList;
  const { data: holdings, error } = useSWR<CoinHolding[]>(url, {
    initialData: initial,
  });

  const value = useMemo<ICoinHoldingListState>(
    () => ({
      holdings,
      error,
      loading: !holdings && !error,
    }),
    [holdings, error]
  );

  return <CoinHoldingListContext.Provider value={value} {...rest} />;
}

export default function useCoinHoldingList(): ICoinHoldingListState {
  const context = useContext(CoinHoldingListContext);

  if (!context) {
    throw new Error("Please use CoinHoldingListProvider in tree.");
  }

  return context;
}
