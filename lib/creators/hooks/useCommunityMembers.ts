import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";

import { CommunityMember } from "../types/community";

export type IUseCommunityMembersProps = {
  communityId?: number;
};
export type IUseCommunityMembersState = {
  data?: PageResponse<CommunityMember>;
  error: unknown;
  loading: boolean;
};

export function useCommunityMembers({
  communityId,
}: IUseCommunityMembersProps): IUseCommunityMembersState {
  const url = `${API_URL_CONSTANTS.community.getCommunityMembers}?community=${communityId}`;
  const { data, error } = useSWR<PageResponse<CommunityMember>>(
    communityId ? url : null
  );

  return {
    data,
    error,
    loading: !data && !error,
  };
}
