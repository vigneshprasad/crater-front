import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";

import { DyteParticpant } from "../types/dyte";

interface IDyteApiClientResult {
  getDyteParticpant: (
    groupId: string
  ) => Promise<ApiResult<DyteParticpant, AxiosError>>;
}

export default function DyteApiClient(
  context: GetSessionOptions
): IDyteApiClientResult {
  const client = API(context);

  async function getDyteParticpant(
    groupId: string
  ): Promise<ApiResult<DyteParticpant, AxiosError>> {
    try {
      const { data } = await client.get<DyteParticpant>(
        API_URL_CONSTANTS.integrations.dyte.getParticpant(groupId)
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    getDyteParticpant,
  };
}
