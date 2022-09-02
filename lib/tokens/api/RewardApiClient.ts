import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";

import { SaleItem } from "../types/store";
import { Reward } from "../types/token";

interface IRewardApiClient {
  getRewardsList: () => Promise<ApiResult<Reward[], AxiosError>>;
  retrieveReward: (rewardId: string) => Promise<ApiResult<Reward, AxiosError>>;
  retrieveRewardSaleItem: (
    saleItemId: string
  ) => Promise<ApiResult<SaleItem, AxiosError>>;
}

export default function RewardApiClient(
  context?: GetSessionOptions
): IRewardApiClient {
  const client = API(context);

  async function getRewardsList(): Promise<ApiResult<Reward[], AxiosError>> {
    try {
      const { data } = await client.get<Reward[]>(
        API_URL_CONSTANTS.rewards.rewardsList
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function retrieveReward(
    rewardId: string
  ): Promise<ApiResult<Reward, AxiosError>> {
    try {
      const { data } = await client.get<Reward>(
        `${API_URL_CONSTANTS.rewards.rewardsList}${rewardId}/`
      );

      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function retrieveRewardSaleItem(
    saleItemId: string
  ): Promise<ApiResult<SaleItem, AxiosError>> {
    try {
      const { data } = await client.get<SaleItem>(
        `${API_URL_CONSTANTS.store.getRewardSaleItems}${saleItemId}/`
      );

      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    getRewardsList,
    retrieveReward,
    retrieveRewardSaleItem,
  };
}
