import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";

import { Coin } from "../types/token";

interface ICoinApiClient {
  getCointforCreator: (
    id: string | number
  ) => Promise<ApiResult<Coin, AxiosError>>;
}

export default function CoinApiClient(
  context?: GetSessionOptions
): ICoinApiClient {
  const client = API(context);

  async function getCointforCreator(
    id: string | number
  ): Promise<ApiResult<Coin, AxiosError>> {
    try {
      const { data } = await client.get<Coin>(
        API_URL_CONSTANTS.coins.getCointForCreator(id)
      );

      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    getCointforCreator,
  };
}
