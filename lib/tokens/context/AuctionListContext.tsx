import { createContext, PropsWithChildren, useMemo, useContext } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";

import { Auction } from "../types/auctions";

export interface IAuctionListState {
  auctions?: Auction[];
  loading: boolean;
  error?: unknown;
}

export const AuctionListContext = createContext({} as IAuctionListState);

type ProviderProps = PropsWithChildren<{
  initial?: Auction[];
  filterCreator?: string | number;
  rewardDetail?: boolean;
  pageSize?: number;
}>;

export function AuctionListProvider({
  initial,
  filterCreator,
  rewardDetail,
  pageSize = 5,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: auctions, error } = useSWR<Auction[]>(
    () => {
      if (filterCreator) {
        return `${API_URL_CONSTANTS.coins.getAuctions}?coin__creator=${filterCreator}`;
      }

      if (rewardDetail) {
        return `${API_URL_CONSTANTS.auctions.getAllAuctions}?page_size=${pageSize}`;
      }

      return API_URL_CONSTANTS.coins.getAuctions;
    },
    async (key: string) => {
      if (rewardDetail) {
        const response = await fetcher<PageResponse<Auction>>(key);
        return response.results;
      }

      const response = await fetcher<Auction[]>(key);
      return response;
    },
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
