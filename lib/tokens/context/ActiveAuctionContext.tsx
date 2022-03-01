import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Auction } from "../types/auctions";

export interface IActiveAuctionState {
  auction?: Auction;
  loading: boolean;
  error?: unknown;
}

const ActiveAuctionContext = createContext({} as IActiveAuctionState);

type ProviderProps = PropsWithChildren<{
  reward: number | string;
  intitial?: Auction;
}>;

export function ActiveAuctionProvider({
  reward,
  intitial,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: auction, error } = useSWR<Auction>(
    API_URL_CONSTANTS.auctions.getActiveAuction(reward),
    { initialData: intitial }
  );

  const value = useMemo(
    () => ({ auction, error, loading: !auction && !error }),
    [auction, error]
  );

  return <ActiveAuctionContext.Provider value={value} {...rest} />;
}

export default function useActiveAuction(): IActiveAuctionState {
  const context = useContext(ActiveAuctionContext);

  if (!context) {
    throw new Error("Please use AuctionListProvider in tree.");
  }

  return context;
}
