import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";

import { Creator } from "../types/creator";

export interface IMemberListState {
  members?: Creator[];
  error?: unknown;
  loading: boolean;
  setMembersPage: SWRInfiniteResponse<Creator[], unknown>["setSize"];
}

export const MembersListContext = createContext({} as IMemberListState);

type IProviderProps = PropsWithChildren<{
  initial: Creator[];
}>;

export function MembersListProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const {
    data,
    error,
    setSize: setMembersPage,
  } = useSWRInfinite<Creator[]>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.length) return null;
      return `${API_URL_CONSTANTS.creator.getCreatorList}?page=${page}&certified=false`;
    },
    async (key: string) => (await fetcher<PageResponse<Creator>>(key)).results,
    { initialData: [[...initial]] }
  );

  const value: IMemberListState = useMemo(
    () => ({
      members: data?.flat(),
      error,
      setMembersPage,
      loading: !data && !error,
    }),
    [data, error, setMembersPage]
  );

  return <MembersListContext.Provider value={value} {...rest} />;
}

export function useMembersList(): IMemberListState {
  const context = useContext(MembersListContext);

  if (!context) {
    throw new Error("Please use MembersListProvider in tree.");
  }

  return context;
}
