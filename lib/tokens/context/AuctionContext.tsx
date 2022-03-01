import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Auction } from "../types/auctions";

export interface IAuctionContextState {
  auction?: Auction;
  error?: unknown;
  loading: boolean;
}

export const AuctionContext = createContext({} as IAuctionContextState);

type IProviderProps = PropsWithChildren<{
  id: number | string;
  initial?: Auction;
}>;

export function AuctionProvider({ id, children }: IProviderProps): JSX.Element {
  const { data: auction, error } = useSWR(
    API_URL_CONSTANTS.auctions.retrievAuction(id)
  );

  const value = useMemo(
    () => ({ auction, error, loading: !auction && !error }),
    [auction, error]
  );

  return (
    <AuctionContext.Provider value={value}>{children}</AuctionContext.Provider>
  );
}

export default function useAuction(): IAuctionContextState {
  const context = useContext(AuctionContext);

  if (!context) {
    throw new Error("Please use AuctionProvider in tree.");
  }

  return context;
}
