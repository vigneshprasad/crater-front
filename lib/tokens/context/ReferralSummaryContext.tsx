import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import useAuth from "@/auth/context/AuthContext";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { ReferralSummary } from "../types/referrals";

interface IReferralSummaryState {
  referralSummary?: ReferralSummary;
  error?: unknown;
  loading: boolean;
}

export const ReferralSummaryContext = createContext(
  {} as IReferralSummaryState
);

type IProviderProps = PropsWithChildren<{
  initial?: ReferralSummary;
}>;

export function ReferralSummaryProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { user } = useAuth();
  const { data: referralSummary, error } = useSWR<ReferralSummary>(
    user ? API_URL_CONSTANTS.user.getReferralSummary : null,
    {
      initialData: initial,
    }
  );

  const value: IReferralSummaryState = useMemo(
    () => ({
      referralSummary,
      error,
      loading: !!user && !referralSummary && !error,
    }),
    [referralSummary, error, user]
  );

  return <ReferralSummaryContext.Provider value={value} {...rest} />;
}

export function useReferralSummary(): IReferralSummaryState {
  const context = useContext(ReferralSummaryContext);

  if (!context) {
    throw new Error("Please use ReferralSummaryProvider in tree.");
  }

  return context;
}
