import { createContext, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { RewardSale } from "../types/sales";

interface RewardSalesListState {
  sales?: RewardSale[];
  isValidating: boolean;
  error?: unknown;
}

export const RewardSalesListContext = createContext({} as RewardSalesListState);

type ProverProps = {
  creator?: number;
  children?: React.ReactNode;
};

export function RewardSalesListProvider({
  creator,
  ...rest
}: ProverProps): JSX.Element {
  const url = creator
    ? `${API_URL_CONSTANTS.sales.getSalesList}?reward__creator=${creator}`
    : API_URL_CONSTANTS.sales.getSalesList;
  const { data: sales, error, isValidating } = useSWR<RewardSale[]>(url);

  const value = useMemo(
    () => ({ sales, isValidating, error }),
    [sales, isValidating, error]
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
