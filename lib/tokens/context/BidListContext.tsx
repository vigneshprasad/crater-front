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
  filterCreator?: string | number;
  filterReward?: string | number;
}>;

export function BidListProvider({
  initial,
  filterBidder,
  filterCreator,
  filterReward,
  ...rest
}: ProviderProps): JSX.Element {
  const url = useMemo(() => {
    if (filterBidder) {
      return `${API_URL_CONSTANTS.auctions.getBids}?bidder=${filterBidder}`;
    }

    if (filterCreator) {
      return `${API_URL_CONSTANTS.auctions.getBids}?creator=${filterCreator}`;
    }

    if (filterReward) {
      return `${API_URL_CONSTANTS.auctions.getBids}?reward=${filterReward}`;
    }

    return API_URL_CONSTANTS.auctions.getBids;
  }, [filterBidder, filterCreator, filterReward]);

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
