import { createContext, PropsWithChildren, useMemo, useContext } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Auction } from "../types/tokens";

export interface IAuctionListState {
  auctions?: Auction[];
  loading: boolean;
  error?: unknown;
}

export const AuctionListContext = createContext({} as IAuctionListState);

type ProviderProps = PropsWithChildren<{
  initial?: Auction[];
  filterCreator?: string | number;
}>;

export function AuctionListProvider({
  initial,
  filterCreator,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: auctions, error } = useSWR<Auction[]>(
    filterCreator
      ? `${API_URL_CONSTANTS.coins.getAuctions}?coin__creator=${filterCreator}`
      : API_URL_CONSTANTS.coins.getAuctions,
    { initialData: initial }
  );

  const value = useMemo(
    () => ({ auctions, error, loading: !auctions && !error }),
    [auctions, error]
  );

  return <AuctionListContext.Provider value={value} {...rest} />;
}

export default function useAuctionsList(): IAuctionListState {
  const context = useContext(AuctionListContext);

  if (!context) {
    throw new Error("Please use AuctionListProvider in tree.");
  }

  return context;
}
