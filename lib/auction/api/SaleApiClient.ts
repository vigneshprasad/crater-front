import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";

import { RewardSale, RewardSaleLog } from "../types/sales";

export type CreateRewardSaleArgs = {
  title: string;
  description?: string;
  price: number;
  quantity: number;
  photo?: string | ArrayBuffer | null;
};

interface ISaleApiClient {
  postRewardSaleLog: (
    log: Partial<RewardSaleLog>
  ) => Promise<ApiResult<RewardSaleLog, AxiosError>>;
  postRewardSale: (
    params: CreateRewardSaleArgs
  ) => Promise<ApiResult<RewardSale, AxiosError>>;
}

export default function SaleApiClient(
  context?: GetSessionOptions
): ISaleApiClient {
  const client = API(context);

  async function postRewardSaleLog(
    log: Partial<RewardSaleLog>
  ): Promise<ApiResult<RewardSaleLog, AxiosError>> {
    try {
      const { data } = await client.post(API_URL_CONSTANTS.sales.postSaleLog, {
        ...log,
      });
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function postRewardSale(
    params: CreateRewardSaleArgs
  ): Promise<ApiResult<RewardSale, AxiosError>> {
    try {
      const { data } = await client.post<RewardSale>(
        API_URL_CONSTANTS.sales.postRewardSale,
        {
          ...params,
        }
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    postRewardSaleLog,
    postRewardSale,
  };
}
