import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult, PageResponse } from "@/common/types/api";
import { PastStreamListItem } from "@/community/types/community";
import { StreamCategory } from "@/creators/types/stream";

interface IStreamApiClient {
  getPastStreams: (
    pageSize?: number
  ) => Promise<ApiResult<PageResponse<PastStreamListItem>, AxiosError>>;
  getAllStreamCategories: (
    homePage: boolean
  ) => Promise<ApiResult<StreamCategory[], AxiosError>>;
  retrieveStreamCategory: (
    id: number | string
  ) => Promise<ApiResult<StreamCategory, AxiosError>>;
  generateCoverPhoto: (
    topic: string,
    avatarUrl: string
  ) => Promise<ApiResult<string, AxiosError>>;
}

export default function StreamApiClient(
  context?: GetSessionOptions
): IStreamApiClient {
  async function getPastStreams(
    pageSize = 20
  ): Promise<ApiResult<PageResponse<PastStreamListItem>, AxiosError>> {
    try {
      const { data } = await API(context).get<PageResponse<PastStreamListItem>>(
        `${API_URL_CONSTANTS.groups.getPastWebinars}?page_size=${pageSize}`
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getAllStreamCategories(
    homePage = false
  ): Promise<ApiResult<StreamCategory[], AxiosError>> {
    try {
      const { data } = await API(context).get<StreamCategory[]>(
        homePage
          ? `${API_URL_CONSTANTS.stream.getCategories}?show_on_home_page=true`
          : API_URL_CONSTANTS.stream.getCategories
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function retrieveStreamCategory(
    id: number | string
  ): Promise<ApiResult<StreamCategory, AxiosError>> {
    try {
      const { data } = await API(context).get<StreamCategory>(
        API_URL_CONSTANTS.stream.retrieveCategory(id)
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function generateCoverPhoto(
    topic: string,
    avatarUrl: string
  ): Promise<ApiResult<string, AxiosError>> {
    try {
      const body = JSON.stringify({
        topic,
        avatar_url: avatarUrl,
      });
      const { data } = await API(context).post(
        API_URL_CONSTANTS.stream.generateCoverPhoto,
        body
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    getPastStreams,
    getAllStreamCategories,
    retrieveStreamCategory,
    generateCoverPhoto,
  };
}
