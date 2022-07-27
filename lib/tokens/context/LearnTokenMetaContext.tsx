import { createContext, useContext, useMemo } from "react";
import useSWR from "swr";

import useAuth from "@/auth/context/AuthContext";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { ILearnUserMeta } from "../types/learn";

interface ILearnTokenMetaState {
  userMeta?: ILearnUserMeta;
  isValidating: boolean;
  error?: unknown;
}

export const LearnTokenMetaContext = createContext({} as ILearnTokenMetaState);

export type ProviderProps = {
  children?: React.ReactNode | undefined;
};

export function LearnTokenMetaProvider({
  ...rest
}: ProviderProps): JSX.Element {
  const { user } = useAuth();
  const {
    data: userMeta,
    isValidating,
    error,
  } = useSWR<ILearnUserMeta>(
    user ? API_URL_CONSTANTS.tokens.getLearnUserMeta : null
  );

  const value = useMemo(
    () => ({
      userMeta,
      isValidating,
      error,
    }),
    [error, isValidating, userMeta]
  );
  return <LearnTokenMetaContext.Provider value={value} {...rest} />;
}

export default function useLearnUserMeta(): ILearnTokenMetaState {
  const context = useContext(LearnTokenMetaContext);

  if (!context) {
    throw new Error("Please use LearnTokenMetaProvider in tree.");
  }

  return context;
}
