import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult, PageResponse } from "@/common/types/api";

import { CommunityMember, Webinar } from "../../community/types/community";
import { Creator } from "../types/creator";

interface ICreatorApiClient {
  getCreatorsList: (
    certified?: boolean
  ) => Promise<ApiResult<PageResponse<Creator>, AxiosError>>;
  getCreator: (id: string) => Promise<ApiResult<Creator, AxiosError>>;
  getCreatorStreams: (
    creatorId: string
  ) => Promise<ApiResult<Webinar[], AxiosError>>;
  getCommunityMemebers: (
    communityId?: number
  ) => Promise<ApiResult<CommunityMember[], AxiosError>>;
}

export default function CreatorApiClient(
  context?: GetSessionOptions
): ICreatorApiClient {
  async function getCreatorsList(
    certified = true
  ): Promise<ApiResult<PageResponse<Creator>, AxiosError>> {
    try {
      const { data } = await API(context).get<PageResponse<Creator>>(
        `${API_URL_CONSTANTS.creator.getCreatorList}?certified=${certified}`
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getCreator(
    id: string
  ): Promise<ApiResult<Creator, AxiosError>> {
    try {
      const { data } = await API(context).get<Creator>(
        `${API_URL_CONSTANTS.creator.getCreatorList}${id}/`
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getCreatorStreams(
    creatorId: string
  ): Promise<ApiResult<Webinar[], AxiosError>> {
    try {
      const { data } = await API(context).get<Webinar[]>(
        `${API_URL_CONSTANTS.groups.getWebinars}?host=${creatorId}/`
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getCommunityMemebers(
    communityId?: number
  ): Promise<ApiResult<CommunityMember[], AxiosError>> {
    const url = communityId
      ? `${API_URL_CONSTANTS.community.getCommunityMembers}?community=${communityId}`
      : API_URL_CONSTANTS.community.getCommunityMembers;

    try {
      const { data } = await API(context).get<PageResponse<CommunityMember>>(
        url
      );
      return [data.results, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    getCreatorsList,
    getCreator,
    getCreatorStreams,
    getCommunityMemebers,
  };
}
