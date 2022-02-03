import { createContext, PropsWithChildren, useMemo, useContext } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Bid } from "../types/auctions";

interface IBidListContextState {
  bids?: Bid[];
  loading: boolean;
  error?: unknown;
}

const BidListContext = createContext({} as IBidListContextState);

type ProviderProps = PropsWithChildren<{
  initial?: Bid[];
  filterBidder?: string;
}>;

export function BidListProvider({
  initial,
  filterBidder,
  ...rest
}: ProviderProps): JSX.Element {
  const url = filterBidder
    ? `${API_URL_CONSTANTS.auctions.getBids}?bidder=${filterBidder}`
    : API_URL_CONSTANTS.auctions.getBids;
  const { data: bids, error } = useSWR(url, { initialData: initial });

  const value = useMemo(
    () => ({
      bids,
      error,
      loading: !bids && !error,
    }),
    [bids, error]
  );

  return <BidListContext.Provider value={value} {...rest} />;
}

export default function useBidsList(): IBidListContextState {
  const context = useContext(BidListContext);

  if (!context) {
    throw new Error("Please use BidListProvider in tree.");
  }

  return context;
}
