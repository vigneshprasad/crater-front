import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { TopCreators } from "../types/creator";

interface ITopCreatorsState {
  topCreators?: TopCreators[];
  error?: unknown;
  loading: boolean;
}

export const TopCreatorsContext = createContext({} as ITopCreatorsState);

type IProviderProps = PropsWithChildren<{
  initial?: TopCreators[];
}>;

export function TopCreatorsProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: topCreators, error } = useSWR<TopCreators[]>(
    API_URL_CONSTANTS.analytics.getTopCreators,
    { initialData: initial }
  );

  const value: ITopCreatorsState = useMemo(
    () => ({
      topCreators,
      error,
      loading: !topCreators && !error,
    }),
    [topCreators, error]
  );

  return <TopCreatorsContext.Provider value={value} {...rest} />;
}

export function useTopCreators(): ITopCreatorsState {
  const context = useContext(TopCreatorsContext);

  if (!context) {
    throw new Error("Please use TopCreatorsProvider in tree.");
  }

  return context;
}
