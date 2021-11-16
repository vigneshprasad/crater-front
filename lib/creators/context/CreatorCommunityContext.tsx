import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";

import { CommunityMember } from "../../community/types/community";

interface ICreatorCommuntyState {
  members?: CommunityMember[];
  error: unknown;
  loading: boolean;
}

export const CreatorCommunityContext = createContext(
  {} as ICreatorCommuntyState
);

type IProviderProps = PropsWithChildren<{
  communityId: number;
  members?: CommunityMember[];
}>;

export function CreatorCommunityProvider({
  communityId,
  members: intialMembers,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: members, error } = useSWRInfinite<CommunityMember[]>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.length) return null;
      return `${API_URL_CONSTANTS.community.getCommunityMembers}?community=${communityId}&page=${page}`;
    },
    async (key: string) =>
      (await fetcher<PageResponse<CommunityMember>>(key)).results,
    { initialData: intialMembers ? [[...intialMembers]] : undefined }
  );

  const value: ICreatorCommuntyState = useMemo(
    () => ({
      members: members?.flat(),
      error,
      loading: !error && !members,
    }),
    [members, error]
  );

  return <CreatorCommunityContext.Provider value={value} {...rest} />;
}

export function useCreatorCommunityMembers(): ICreatorCommuntyState {
  const context = useContext(CreatorCommunityContext);

  if (!context) {
    throw new Error("Please use CreatorCommunityProvider in tree.");
  }

  return context;
}
