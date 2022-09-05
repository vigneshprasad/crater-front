import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { RewardSalePaymentType, SaleItem } from "../types/store";

interface IRewardSaleFeaturedItemsListState {
  saleItems?: SaleItem[];
  loading: boolean;
  error?: unknown;
}

export const RewardSaleFeaturedItemsListContext = createContext(
  {} as IRewardSaleFeaturedItemsListState
);

type ProviderProps = PropsWithChildren<{
  initial?: SaleItem[];
  paymentType?: RewardSalePaymentType;
}>;

export function RewardSaleFeaturedItemsListProvider({
  initial,
  paymentType,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: saleItems, error } = useSWR<SaleItem[]>(
    paymentType
      ? `${API_URL_CONSTANTS.store.getFeaturedRewardSaleItems}?sale__payment_type=${paymentType}`
      : API_URL_CONSTANTS.store.getFeaturedRewardSaleItems,
    {
      initialData: initial,
    }
  );

  const value = useMemo(
    () => ({
      saleItems,
      error,
      loading: !saleItems && !error,
    }),
    [saleItems, error]
  );

  return (
    <RewardSaleFeaturedItemsListContext.Provider value={value} {...rest} />
  );
}

export default function useRewardSaleFeaturedItemsList(): IRewardSaleFeaturedItemsListState {
  const context = useContext(RewardSaleFeaturedItemsListContext);

  if (!context) {
    throw new Error("Please use RewardSaleFeaturedItemsListProvider in tree.");
  }

  return context;
}
