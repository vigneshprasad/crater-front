import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { RewardSalePaymentType, SaleItem } from "../types/store";

interface IRewardSaleItemsListState {
  saleItems?: SaleItem[];
  loading: boolean;
  error?: unknown;
}

export const RewardSaleItemsListContext = createContext(
  {} as IRewardSaleItemsListState
);

type ProviderProps = PropsWithChildren<{
  initial?: SaleItem[];
  paymentType?: RewardSalePaymentType;
}>;

export function RewardSaleItemsListProvider({
  initial,
  paymentType,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: saleItems, error } = useSWR<SaleItem[]>(
    paymentType
      ? `${API_URL_CONSTANTS.store.getRewardSaleItems}?sale__payment_type=${paymentType}`
      : API_URL_CONSTANTS.store.getRewardSaleItems,
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

  return <RewardSaleItemsListContext.Provider value={value} {...rest} />;
}

export default function useRewardSaleItemsList(): IRewardSaleItemsListState {
  const context = useContext(RewardSaleItemsListContext);

  if (!context) {
    throw new Error("Please use RewardSaleItemsListProvider in tree.");
  }

  return context;
}
