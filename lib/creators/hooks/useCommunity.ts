import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";

import { Community } from "../types/community";

export type IUseCommunityProps = {
  creatorId: number;
};

export type IUseCommunityState = {
  data?: PageResponse<Community>;
  loading: boolean;
  error?: unknown;
};

export function useCommunity({
  creatorId,
}: IUseCommunityProps): IUseCommunityState {
  const url = `${API_URL_CONSTANTS.community.getCommunityList}?creator=${creatorId}`;
  const { data, error } = useSWR<PageResponse<Community>>(url, fetcher);
  return {
    data,
    loading: !data && !error,
    error,
  };
}
