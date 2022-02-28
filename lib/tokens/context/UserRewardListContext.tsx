import { createContext, useMemo, useContext } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { UserReward } from "../types/exchange";

interface IUserRewardListState {
  userRewards?: UserReward[];
  loading: boolean;
  error?: unknown;
}

export const UserRewardListContext = createContext({} as IUserRewardListState);

type ProviderProps = {
  children: React.ReactNode;
  iniital?: UserReward[];
  filterUser?: string;
};

export function UserRewardListProvider({
  filterUser,
  children,
}: ProviderProps): JSX.Element {
  const { data: userRewards, error } = useSWR<UserReward[]>(
    filterUser
      ? `${API_URL_CONSTANTS.exchange.userRewardList}?user=${filterUser}`
      : API_URL_CONSTANTS.exchange.userRewardList
  );

  const value = useMemo(
    () => ({ userRewards, error, loading: !userRewards && !error }),
    [userRewards, error]
  );

  return (
    <UserRewardListContext.Provider value={value}>
      {children}
    </UserRewardListContext.Provider>
  );
}

export default function useUserRewardList(): IUserRewardListState {
  const context = useContext(UserRewardListContext);
  if (context === undefined) {
    throw new Error(
      "useUserRewardList must be used within a UserRewardListProvider"
    );
  }
  return context;
}
