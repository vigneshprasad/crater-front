import { createContext, useContext, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { RewardSale, SalePaymentType } from "../types/sales";

interface RewardSalesListState {
  sales?: RewardSale[];
  isValidating: boolean;
  error?: unknown;
  mutate: SWRResponse<RewardSale[], unknown>["mutate"];
}

export const RewardSalesListContext = createContext({} as RewardSalesListState);

type ProverProps = {
  creator?: number;
  paymentType?: SalePaymentType;
  children?: React.ReactNode;
};

export function RewardSalesListProvider({
  creator,
  paymentType,
  ...rest
}: ProverProps): JSX.Element {
  let url = API_URL_CONSTANTS.sales.getSalesList;

  if (creator) {
    url = `${API_URL_CONSTANTS.sales.getSalesList}?reward__creator=${creator}`;
  }

  if (paymentType) {
    url = `${API_URL_CONSTANTS.sales.getSalesList}?payment_type=${paymentType}`;
  }

  const {
    data: sales,
    error,
    isValidating,
    mutate,
  } = useSWR<RewardSale[]>(url);

  const value = useMemo(
    () => ({ sales, isValidating, error, mutate }),
    [sales, isValidating, error, mutate]
  );
  return <RewardSalesListContext.Provider value={value} {...rest} />;
}

export default function useRewardSalesList(): RewardSalesListState {
  const context = useContext(RewardSalesListContext);

  if (!context) {
    throw new Error("You need to wrap RewardSalesListProvider.");
  }

  return context;
}
