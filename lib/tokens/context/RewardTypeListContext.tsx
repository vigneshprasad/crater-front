import { createContext, PropsWithChildren, useMemo, useContext } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { RewardType } from "../types/token";

interface IRewardTypeListState {
  types?: RewardType[];
  error?: unknown;
  loading: boolean;
}

export const RewardTypeListContext = createContext({} as IRewardTypeListState);

type ProviderProps = PropsWithChildren<{
  iniital?: RewardType[];
}>;

export function RewardTypeListProvider({
  iniital,
  children,
}: ProviderProps): JSX.Element {
  const { data: types, error } = useSWR<RewardType[]>(
    API_URL_CONSTANTS.rewards.rewardTypesList,
    { initialData: iniital }
  );

  const value = useMemo(
    () => ({ types, error, loading: !types && !error }),
    [types, error]
  );

  return (
    <RewardTypeListContext.Provider value={value}>
      {children}
    </RewardTypeListContext.Provider>
  );
}

export default function useRewardTypeList(): IRewardTypeListState {
  const context = useContext(RewardTypeListContext);

  if (!context) {
    throw new Error(
      "useUserRewardList must be used within a RewardTypeListProvider"
    );
  }

  return context;
}
