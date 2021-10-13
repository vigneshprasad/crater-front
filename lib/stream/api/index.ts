import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";
import { Webinar } from "@/community/types/community";

interface IStreamApiClient {
  getPastStreams: () => Promise<ApiResult<Webinar[], AxiosError>>;
}

export default function StreamApiClient(
  context?: GetSessionOptions
): IStreamApiClient {
  async function getPastStreams(): Promise<ApiResult<Webinar[], AxiosError>> {
    try {
      const { data } = await API(context).get<Webinar[]>(
        API_URL_CONSTANTS.groups.getPastWebinars
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
