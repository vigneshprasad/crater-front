import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";

import { MultiStream } from "../types/community";

interface IMultiStreamApiClientResult {
  getSquadForGroup: (
    id: string | number
  ) => Promise<ApiResult<MultiStream, AxiosError>>;
}

export default function MultiStreamApiClient(
  context?: GetSessionOptions
): IMultiStreamApiClientResult {
  const client = API(context);

  async function getSquadForGroup(
    id: string | number
  ): Promise<ApiResult<MultiStream, AxiosError>> {
    try {
      const { data } = await client.get<MultiStream>(
        API_URL_CONSTANTS.multistream.getMultiStreamForGroup(id)
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return { getSquadForGroup };
}
