import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult, PageResponse } from "@/common/types/api";

import { CommunityMember, Webinar } from "../../community/types/community";
import { Creator } from "../types/creator";
import { CreateWebinar, StreamFormArgs } from "../types/stream";

interface ICreatorApiClient {
  getCreatorsList: (
    certified?: boolean,
    page?: number,
    pageSize?: number
  ) => Promise<ApiResult<PageResponse<Creator>, AxiosError>>;
  getCreator: (id: string) => Promise<ApiResult<Creator, AxiosError>>;
  getCreatorStreams: (
    creatorId: string
  ) => Promise<ApiResult<Webinar[], AxiosError>>;
  getCommunityMemebers: (
    communityId?: number
  ) => Promise<ApiResult<CommunityMember[], AxiosError>>;
  postStream: (
    stream: CreateWebinar
  ) => Promise<ApiResult<Webinar, AxiosError>>;
}

export default function CreatorApiClient(
  context?: GetSessionOptions
): ICreatorApiClient {
  const client = API(context);

  async function getCreatorsList(
    certified = true,
    page = 1,
    pageSize = 10
  ): Promise<ApiResult<PageResponse<Creator>, AxiosError>> {
    try {
      const { data } = await API(context).get<PageResponse<Creator>>(
        `${API_URL_CONSTANTS.creator.getCreatorList}?certified=${certified}&page=${page}&page_size=${pageSize}`
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
        `${API_URL_CONSTANTS.groups.getWebinars}?host=${creatorId}`
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

  async function postStream(
    stream: Partial<StreamFormArgs>
  ): Promise<ApiResult<Stream, AxiosError>> {
    try {
      const { data } = await client.post<Stream>(
        API_URL_CONSTANTS.stream.createStream,
        stream
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    getCreatorsList,
    getCreator,
    getCreatorStreams,
    getCommunityMemebers,
    postStream,
  };
}
