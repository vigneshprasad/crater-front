import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult, PageResponse } from "@/common/types/api";
import { Webinar } from "@/community/types/community";

interface IStreamApiClient {
  getPastStreams: (
    pageSize?: number
  ) => Promise<ApiResult<PageResponse<Webinar>, AxiosError>>;
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

  return {
    getPastStreams,
  };
}
