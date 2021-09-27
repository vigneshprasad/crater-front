import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { UserTag } from "@/auth/types/auth";

import { API_URL_CONSTANTS } from "../constants/url.constants";

type MetaKeys = "user_tags";

interface IMetaState {
  userTags?: UserTag[];
  loading: boolean;
  error?: unknown;
}

export const MetaContext = createContext({} as IMetaState);

type IProviderProps = PropsWithChildren<{
  fetchKeys: MetaKeys[];
  initial?: {
    userTags?: UserTag[];
  };
}>;

export function MetaProvider({
  fetchKeys,
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: userTags, error } = useSWR<UserTag[]>(
    fetchKeys.includes("user_tags") ? API_URL_CONSTANTS.meta.userTags : null,
    { initialData: initial?.userTags }
  );

  const value: IMetaState = useMemo(
    () => ({ userTags, error, loading: !userTags && !error }),
    [userTags, error]
  );

  return <MetaContext.Provider value={value} {...rest} />;
}

export default function useMeta(): IMetaState {
  const context = useContext(MetaContext);

  if (!context) {
    throw new Error("You need to wrap MetaProvider.");
  }

  return context;
}
