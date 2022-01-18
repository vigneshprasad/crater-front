import { createContext, useMemo, useContext, PropsWithChildren } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { StripePaymentIntent } from "../types/payments";

export interface IStripeIntentState {
  paymentIntent?: StripePaymentIntent;
  error?: unknown;
  loading: boolean;
}

export const StripeIntentContext = createContext({} as IStripeIntentState);

export type ProviderProps = PropsWithChildren<{
  secret: string;
  initial?: StripePaymentIntent;
}>;

export function StripeIntentProvider({
  secret,
  initial,
  ...rest
}: ProviderProps): JSX.Element {
  const { data: paymentIntent, error } = useSWR<StripePaymentIntent>(
    API_URL_CONSTANTS.payments.retrieveStripeIntent(secret),
    { initialData: initial }
  );

  const value = useMemo(
    () => ({ paymentIntent, error, loading: !paymentIntent && !error }),
    [paymentIntent, error]
  );

  return <StripeIntentContext.Provider value={value} {...rest} />;
}

export default function useStripeIntent(): IStripeIntentState {
  const context = useContext(StripeIntentContext);

  if (!context) {
    throw new Error("Please use StripeIntentProvider in tree.");
  }

  return context;
}
