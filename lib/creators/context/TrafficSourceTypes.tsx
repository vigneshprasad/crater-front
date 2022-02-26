import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { TrafficSourceType } from "../types/creator";

interface ITrafficSourceTypesState {
  trafficSourceTypes?: TrafficSourceType[];
  error?: unknown;
  loading: boolean;
}

export const TrafficSourceTypesContext = createContext(
  {} as ITrafficSourceTypesState
);

type IProviderProps = PropsWithChildren<{
  initial?: TrafficSourceType[];
}>;

export function TrafficSourceTypesProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: trafficSourceTypes, error } = useSWR<TrafficSourceType[]>(
    API_URL_CONSTANTS.analytics.getTrafficSourceTypes,
    { initialData: initial }
  );

  const value: ITrafficSourceTypesState = useMemo(
    () => ({
      trafficSourceTypes,
      error,
      loading: !trafficSourceTypes && !error,
    }),
    [trafficSourceTypes, error]
  );

  return <TrafficSourceTypesContext.Provider value={value} {...rest} />;
}

export function useTrafficSourceTypes(): ITrafficSourceTypesState {
  const context = useContext(TrafficSourceTypesContext);

  if (!context) {
    throw new Error("Please use TrafficSourceTypesProvider in tree.");
  }

  return context;
}
