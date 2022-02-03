import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult, PageResponse } from "@/common/types/api";
import {
  Group,
  GroupRequest,
  PostGroupRequest,
  Series,
  Webinar,
} from "@/community/types/community";

interface IApiClientResult {
  getWebinar: (id: string) => Promise<ApiResult<Webinar, AxiosError>>;
  getAllWebinar: () => Promise<ApiResult<Webinar[], AxiosError>>;
  getWebinarRequest: (
    id: string
  ) => Promise<ApiResult<GroupRequest, AxiosError>>;
  postWebinarRequest: (
    request: PostGroupRequest
  ) => Promise<ApiResult<GroupRequest, AxiosError>>;
  getAllUpcominWebinars: () => Promise<ApiResult<Group[], AxiosError>>;
  getAllLiveWebinars: () => Promise<ApiResult<Webinar[], AxiosError>>;
  getAllSeries: () => Promise<ApiResult<Series[], AxiosError>>;
  postSeriesRequest: (
    series: number
  ) => Promise<ApiResult<GroupRequest[], AxiosError>>;
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

  async function getAllWebinar(): Promise<ApiResult<Webinar[], AxiosError>> {
    try {
      const { data } = await client.get<Webinar[]>(
        API_URL_CONSTANTS.conversations.allWebinars
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
        API_URL_CONSTANTS.groups.getUpcominWebinars
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getAllLiveWebinars(): Promise<
    ApiResult<Webinar[], AxiosError>
  > {
    try {
      const { data } = await client.get<PageResponse<Webinar>>(
        API_URL_CONSTANTS.groups.getAllLiveWebinars
      );

      return [data.results, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getAllSeries(): Promise<ApiResult<Series[], AxiosError>> {
    try {
      const { data } = await client.get<PageResponse<Series>>(
        API_URL_CONSTANTS.series.getAllSeries
      );

      return [data.results, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function postSeriesRequest(
    series: number
  ): Promise<ApiResult<GroupRequest[], AxiosError>> {
    try {
      const { data } = await client.post<GroupRequest[]>(
        API_URL_CONSTANTS.series.postSeriesRequest,
        {
          series_id: series,
        }
      );

      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    getWebinar,
    getAllWebinar,
    getWebinarRequest,
    postWebinarRequest,
    getAllUpcominWebinars,
    getAllLiveWebinars,
    getAllSeries,
    postSeriesRequest,
  };
}
