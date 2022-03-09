import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { UsersByCrater } from "../types/creator";

interface IUsersByCraterState {
  usersByCrater?: number;
  error?: unknown;
  loading: boolean;
}

export const UsersByCraterContext = createContext({} as IUsersByCraterState);

type IProviderProps = PropsWithChildren<{
  initial?: UsersByCrater;
}>;

export function UsersByCraterProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data, error } = useSWR<UsersByCrater>(
    API_URL_CONSTANTS.analytics.getUsersByCrater,
    {
      initialData: initial,
    }
  );

  const value: IUsersByCraterState = useMemo(
    () => ({
      usersByCrater: data?.percentage,
      error,
      loading: !data && !error,
    }),
    [data, error]
  );

  return <UsersByCraterContext.Provider value={value} {...rest} />;
}

export function useUsersByCrater(): IUsersByCraterState {
  const context = useContext(UsersByCraterContext);

  if (!context) {
    throw new Error("Please use UsersByCraterProvider in tree.");
  }

  return context;
}
