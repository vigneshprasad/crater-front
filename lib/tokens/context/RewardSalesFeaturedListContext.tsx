import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { RewardSale, SalePaymentType } from "@/auction/types/sales";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

interface IRewardSalesFeaturedListState {
  sales?: RewardSale[];
  loading: boolean;
  error?: unknown;
}

export const RewardSalesFeaturedListContext = createContext(
  {} as IRewardSalesFeaturedListState
);

type ProviderProps = PropsWithChildren<{
  initial?: RewardSale[];
  paymentType?: SalePaymentType;
}>;

export function RewardSalesFeaturedListProvider({
  initial,
  paymentType,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: sales, error } = useSWR<RewardSale[]>(
    paymentType
      ? `${API_URL_CONSTANTS.sales.getFeaturedSalesList}?payment_type=${paymentType}`
      : API_URL_CONSTANTS.sales.getFeaturedSalesList,
    {
      initialData: initial,
    }
  );

  const value = useMemo(
    () => ({
      sales,
      error,
      loading: !sales && !error,
    }),
    [sales, error]
  );

  return <RewardSalesFeaturedListContext.Provider value={value} {...rest} />;
}

export default function useRewardSalesFeaturedList(): IRewardSalesFeaturedListState {
  const context = useContext(RewardSalesFeaturedListContext);

  if (!context) {
    throw new Error("Please use RewardSalesFeaturedListProvider in tree.");
  }

  return context;
}
