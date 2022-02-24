import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Reward } from "../types/token";

export interface IRewardsContext {
  rewards?: Reward[];
  error: unknown;
  loading: boolean;
}

export const RewardsContext = createContext({} as IRewardsContext);

type IProviderProps = PropsWithChildren<{
  initial?: Reward[];
  filterCreatorSlug?: number | string;
  filterCreatorId?: number | string;
}>;

export function RewardsListProvider({
  initial,
  filterCreatorSlug,
  filterCreatorId,
  ...rest
}: IProviderProps): JSX.Element {
  const url = useMemo(() => {
    if (filterCreatorSlug) {
      return `${API_URL_CONSTANTS.rewards.rewardsList}?creator__slug=${filterCreatorSlug}`;
    }
    if (filterCreatorId) {
      return `${API_URL_CONSTANTS.rewards.rewardsList}?creator=${filterCreatorId}`;
    }
    return API_URL_CONSTANTS.rewards.rewardsList;
  }, [filterCreatorSlug, filterCreatorId]);
  const { data: rewards, error } = useSWR<Reward[]>(url, {
    initialData: initial,
  });

  const value = useMemo(
    () => ({
      rewards,
      error,
      loading: !error && !rewards,
    }),
    [rewards, error]
  );

  return <RewardsContext.Provider value={value} {...rest} />;
}

export default function useRewardsList(): IRewardsContext {
  const context = useContext(RewardsContext);

  if (!context) {
    throw new Error("Please use RewardsListProvider in tree.");
  }

  return context;
}
