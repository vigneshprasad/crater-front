import { Profile } from "next-auth";
import { createContext, PropsWithChildren, useMemo, useContext } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";

interface INetworkListState {
  members?: Profile[];
  error?: unknown;
  loading: boolean;
  setNetworkPage: SWRInfiniteResponse<Profile[], unknown>["setSize"];
}

export const NetworkListContext = createContext({} as INetworkListState);

export type IProviderProps = PropsWithChildren<unknown>;

export function NetworkListProvider({ ...rest }: IProviderProps): JSX.Element {
  const {
    data: members,
    error,
    setSize: setNetworkPage,
  } = useSWRInfinite<Profile[]>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.length) return null;
      return `${API_URL_CONSTANTS.user.network}?page=${page}`;
    },
    async (key: string) => {
      return (await fetcher<PageResponse<Profile>>(key)).results;
    }
  );

  const value: INetworkListState = useMemo(
    () => ({
      members: members?.flat(),
      error,
      loading: !members && !error,
      setNetworkPage,
    }),
    [members, error, setNetworkPage]
  );

  return <NetworkListContext.Provider value={value} {...rest} />;
}

export default function useNetworkList(): INetworkListState {
  const context = useContext(NetworkListContext);

  if (!context) {
    throw new Error("Please use NetworkListProvider in tree.");
  }

  return context;
}
