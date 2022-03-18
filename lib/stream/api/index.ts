import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult, PageResponse } from "@/common/types/api";
import { Webinar } from "@/community/types/community";
import { StreamCategory } from "@/creators/types/stream";

interface IStreamApiClient {
  getPastStreams: (
    pageSize?: number
  ) => Promise<ApiResult<PageResponse<Webinar>, AxiosError>>;
  getAllStreamCategories: (
    homePage: boolean
  ) => Promise<ApiResult<StreamCategory[], AxiosError>>;
  retrieveStreamCategory: (
    id: number | string
  ) => Promise<ApiResult<StreamCategory, AxiosError>>;
}

export default function StreamApiClient(
  context?: GetSessionOptions
): IStreamApiClient {
  async function getPastStreams(
    pageSize = 20
  ): Promise<ApiResult<PageResponse<Webinar>, AxiosError>> {
    try {
      const { data } = await API(context).get<PageResponse<Webinar>>(
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

  return {
    getPastStreams,
    getAllStreamCategories,
    retrieveStreamCategory,
  };
}
