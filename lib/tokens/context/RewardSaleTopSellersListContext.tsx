import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Seller } from "../types/store";

interface IRewardSaleTopSellersListState {
  sellers?: Seller[];
  loading: boolean;
  error?: unknown;
  mutateRewardSaleTopSellers: SWRResponse<Seller[], unknown>["mutate"];
}

export const RewardSaleTopSellersListContext = createContext(
  {} as IRewardSaleTopSellersListState
);

type ProviderProps = PropsWithChildren<{
  initial?: Seller[];
}>;

export function RewardSaleTopSellersListProvider({
  initial,
  ...rest
}: ProviderProps): JSX.Element {
  const {
    data: sellers,
    error,
    mutate: mutateRewardSaleTopSellers,
  } = useSWR<Seller[]>(API_URL_CONSTANTS.sales.getRewardSaleTopSellers, {
    initialData: initial,
  });

  const value = useMemo(
    () => ({
      sellers,
      error,
      loading: !sellers && !error,
      mutateRewardSaleTopSellers,
    }),
    [sellers, error, mutateRewardSaleTopSellers]
  );

  return <RewardSaleTopSellersListContext.Provider value={value} {...rest} />;
}

export default function useRewardSaleTopSellersList(): IRewardSaleTopSellersListState {
  const context = useContext(RewardSaleTopSellersListContext);

  if (!context) {
    throw new Error("Please use RewardSaleTopSellersListProvider in tree.");
  }

  return context;
}
