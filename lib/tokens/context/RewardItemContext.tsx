import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSwr from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Reward } from "../types/token";

export interface IRewardItemState {
  reward?: Reward;
  loading: boolean;
  error?: unknown;
}

export const RewardItemContext = createContext({} as IRewardItemState);

type ProviderProps = PropsWithChildren<{
  id: string | number;
  initial?: Reward;
}>;

export function RewardItemProvider({
  id,
  initial,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: reward, error } = useSwr(
    `${API_URL_CONSTANTS.rewards.rewardsList}${id}/`,
    {
      initialData: initial,
    }
  );

  const value = useMemo(
    () => ({
      reward,
      error,
      loading: !reward && !error,
    }),
    [reward, error]
  );
  return <RewardItemContext.Provider value={value} {...rest} />;
}

export default function useRewardItem(): IRewardItemState {
  const context = useContext(RewardItemContext);

  if (!context) {
    throw new Error("Please use RewardItemProvider in tree.");
  }

  return context;
}
