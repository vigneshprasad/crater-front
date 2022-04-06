import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import useAuth from "@/auth/context/AuthContext";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";

import { Referral } from "../types/referrals";

interface IReferralListState {
  referrals?: Referral[];
  error?: unknown;
  loading: boolean;
  setReferralsPage: SWRInfiniteResponse<
    PageResponse<Referral>,
    unknown
  >["setSize"];
}

export const ReferralsListContext = createContext({} as IReferralListState);

type IProviderProps = PropsWithChildren<{
  initial?: PageResponse<Referral>;
  pageSize?: number;
}>;

export function ReferralListProvider({
  initial,
  pageSize = 10,
  ...rest
}: IProviderProps): JSX.Element {
  const { user } = useAuth();
  const {
    data: referrals,
    error,
    setSize: setReferralsPage,
  } = useSWRInfinite<PageResponse<Referral>>(
    (index, previousData) => {
      if (!user) {
        return null;
      }

      const page = index + 1;
      if (previousData && !previousData.next) return null;
      return `${API_URL_CONSTANTS.user.getAllReferrals}?page=${page}&page_size=${pageSize}`;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: IReferralListState = useMemo(
    () => ({
      referrals: referrals?.flatMap((page) => page.results),
      error,
      loading: !!user && !referrals && !error,
      setReferralsPage,
    }),
    [referrals, error, setReferralsPage, user]
  );

  return <ReferralsListContext.Provider value={value} {...rest} />;
}

export function useReferralsList(): IReferralListState {
  const context = useContext(ReferralsListContext);

  if (!context) {
    throw new Error("Please use ReferralListProvider in tree.");
  }

  return context;
}
