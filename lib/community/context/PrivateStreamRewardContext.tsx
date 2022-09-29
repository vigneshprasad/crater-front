import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { RewardSale, RewardSaleLog } from "@/auction/types/sales";
import useAuth from "@/auth/context/AuthContext";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

export interface PrivateStreamRewardState {
  rewardSale?: RewardSale;
  rewardSaleLog?: RewardSaleLog;
  loading: boolean;
  error?: unknown;
  errorRewardSaleLog?: unknown;
  mutateRewardSale: SWRResponse<RewardSale, unknown>["mutate"];
  mutateRewardSaleLog: SWRResponse<RewardSaleLog, unknown>["mutate"];
}

export const PrivateStreamRewardContext = createContext(
  {} as PrivateStreamRewardState
);

type IPrivateStreamRewardProviderProps = PropsWithChildren<{
  initial?: RewardSale;
  id: string;
}>;

export function PrivateStreamRewardProvider({
  id,
  initial,
  ...rest
}: IPrivateStreamRewardProviderProps): JSX.Element {
  const {
    data: rewardSale,
    error,
    mutate: mutateRewardSale,
  } = useSWR<RewardSale>(
    API_URL_CONSTANTS.sales.retrieveRewardSaleForStream(id),
    {
      initialData: initial,
    }
  );

  const { user } = useAuth();
  const {
    data: rewardSaleLog,
    error: errorRewardSaleLog,
    mutate: mutateRewardSaleLog,
  } = useSWR<RewardSaleLog>(
    rewardSale && user?.apiToken
      ? API_URL_CONSTANTS.sales.getPendingSaleLog(rewardSale.id)
      : null
  );

  const value: PrivateStreamRewardState = useMemo(
    () => ({
      rewardSale,
      rewardSaleLog,
      error,
      errorRewardSaleLog,
      loading: !rewardSale && !error && !errorRewardSaleLog,
      mutateRewardSale,
      mutateRewardSaleLog,
    }),
    [
      rewardSale,
      rewardSaleLog,
      error,
      errorRewardSaleLog,
      mutateRewardSale,
      mutateRewardSaleLog,
    ]
  );
  return <PrivateStreamRewardContext.Provider value={value} {...rest} />;
}

export function usePrivateStreamReward(): PrivateStreamRewardState {
  const context = useContext(PrivateStreamRewardContext);

  if (!context) {
    throw new Error("Please use PrivateStreamRewardProvider in tree.");
  }

  return context;
}
