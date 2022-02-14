import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { ConversionFunnel } from "../types/creator";

interface IConversionFunnelState {
  conversionFunnel?: ConversionFunnel;
  error?: unknown;
  loading: boolean;
}

export const ConversionFunnelContext = createContext(
  {} as IConversionFunnelState
);

type IProviderProps = PropsWithChildren<{
  initial?: ConversionFunnel;
}>;

export function ConversionFunnelProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: conversionFunnel, error } = useSWR<ConversionFunnel>(
    API_URL_CONSTANTS.analytics.getConversionFunnel,
    {
      initialData: initial,
    }
  );

  const value: IConversionFunnelState = useMemo(
    () => ({
      conversionFunnel,
      error,
      loading: !conversionFunnel && !error,
    }),
    [conversionFunnel, error]
  );

  return <ConversionFunnelContext.Provider value={value} {...rest} />;
}

export function useConversionFunnel(): IConversionFunnelState {
  const context = useContext(ConversionFunnelContext);

  if (!context) {
    throw new Error("Please use ConversionFunnelProvider in tree.");
  }

  return context;
}
