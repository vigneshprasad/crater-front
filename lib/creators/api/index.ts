import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult, PageResponse } from "@/common/types/api";

import { Creator } from "../types/creator";

interface ICreatorApiClient {
  getCreatorsList: (
    certified?: boolean
  ) => Promise<ApiResult<PageResponse<Creator>, AxiosError>>;
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

  return {
    getCreatorsList,
  };
}
