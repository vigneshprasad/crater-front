import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";
import {
  Group,
  GroupRequest,
  PostGroupRequest,
  Webinar,
} from "@/creators/types/community";

interface IApiClientResult {
  getWebinar: (id: string) => Promise<ApiResult<Webinar, AxiosError>>;
  getWebinarRequest: (
    id: string
  ) => Promise<ApiResult<GroupRequest, AxiosError>>;
  postWebinarRequest: (
    request: PostGroupRequest
  ) => Promise<ApiResult<GroupRequest, AxiosError>>;
  getAllUpcominWebinars: () => Promise<ApiResult<Group[], AxiosError>>;
}

export default function WebinarApiClient(
  context?: GetSessionOptions
): IApiClientResult {
  const client = API(context);

  async function getWebinar(
    id: string
  ): Promise<ApiResult<Webinar, AxiosError>> {
    try {
      const { data } = await client.get<Webinar>(
        API_URL_CONSTANTS.conversations.retrieveWebinar(id)
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getWebinarRequest(
    id: string
  ): Promise<ApiResult<GroupRequest, AxiosError>> {
    try {
      const { data } = await client.get<GroupRequest>(
        API_URL_CONSTANTS.groups.retrieveGroupRequest(id)
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function postWebinarRequest(
    request: PostGroupRequest
  ): Promise<ApiResult<GroupRequest, AxiosError>> {
    try {
      const { data } = await client.post<GroupRequest>(
        API_URL_CONSTANTS.groups.postGroupRequest,
        request
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getAllUpcominWebinars(): Promise<
    ApiResult<Group[], AxiosError>
  > {
    try {
      const { data } = await client.get<Group[]>(
        API_URL_CONSTANTS.groups.getAllUpcomintWebinars
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    getWebinar,
    getWebinarRequest,
    postWebinarRequest,
    getAllUpcominWebinars,
  };
}
