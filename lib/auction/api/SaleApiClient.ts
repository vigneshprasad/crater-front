import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";

import { RewardSaleLog } from "../types/sales";

interface ISaleApiClient {
  postRewardSaleLog: (
    log: Partial<RewardSaleLog>
  ) => Promise<ApiResult<RewardSaleLog, AxiosError>>;
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

  return {
    postRewardSaleLog,
  };
}
