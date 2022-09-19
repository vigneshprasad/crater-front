import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { RewardSale } from "@/auction/types/sales";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

export interface PrivateStreamRewardState {
  rewardSale?: RewardSale;
  loading: boolean;
  error?: unknown;
  mutateRewardSale: SWRResponse<RewardSale, unknown>["mutate"];
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

  const value: PrivateStreamRewardState = useMemo(
    () => ({
      rewardSale,
      error,
      loading: !rewardSale && !error,
      mutateRewardSale,
    }),
    [rewardSale, error, mutateRewardSale]
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
