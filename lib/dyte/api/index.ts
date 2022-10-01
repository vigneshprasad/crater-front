import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";

import { DyteLiveStream, DyteParticpant } from "../types/dyte";

interface IDyteApiClientResult {
  getDyteParticpant: (
    groupId: string
  ) => Promise<ApiResult<DyteParticpant, AxiosError>>;
  postDyteWebinarConnect: (
    groupId: string
  ) => Promise<ApiResult<DyteParticpant, AxiosError>>;
  updateDyteLivestream: (
    id: number,
    livestream: Partial<DyteLiveStream>
  ) => Promise<ApiResult<DyteLiveStream, AxiosError>>;
}

export default function DyteApiClient(
  context?: GetSessionOptions
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

  async function postDyteWebinarConnect(
    groupId: string
  ): Promise<ApiResult<DyteParticpant, AxiosError>> {
    try {
      const { data } = await client.post<DyteParticpant>(
        API_URL_CONSTANTS.integrations.dyte.connect(groupId)
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function updateDyteLivestream(
    id: number,
    livestream: Partial<DyteLiveStream>
  ): Promise<ApiResult<DyteLiveStream, AxiosError>> {
    try {
      const { data } = await client.put<DyteLiveStream>(
        API_URL_CONSTANTS.integrations.dyte.updateLivestream(id),
        livestream
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    getDyteParticpant,
    postDyteWebinarConnect,
    updateDyteLivestream,
  };
}
