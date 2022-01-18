import { createContext, useMemo, useContext, PropsWithChildren } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Bid } from "../types/auctions";

export interface IBidContextState {
  bid?: Bid;
  error?: unknown;
  loading: boolean;
}

export const BidContext = createContext({} as IBidContextState);

export type ProviderProps = PropsWithChildren<{
  id: number;
  initial?: Bid;
}>;

export function BidProvider({
  id,
  initial,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: bid, error } = useSWR<Bid>(
    API_URL_CONSTANTS.auctions.retrieveBid(id),
    { initialData: initial }
  );

  const value = useMemo(
    () => ({ bid, error, loading: !bid && !error }),
    [bid, error]
  );

  return <BidContext.Provider value={value} {...rest} />;
}

export default function useBid(): IBidContextState {
  const context = useContext(BidContext);

  if (!context) {
    throw new Error("Please use BidProvider in tree.");
  }

  return context;
}
