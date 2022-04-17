import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";

import { Challenge, Leaderboard } from "../types/leaderboard";

interface ILeaderboardApiClient {
  getChallengeList: () => Promise<ApiResult<Challenge[], AxiosError>>;
  getLeaderboardList: (
    filterChallenge?: string | number
  ) => Promise<ApiResult<Leaderboard[], AxiosError>>;
  retrieveChallenge: (
    Challenge: string | number
  ) => Promise<ApiResult<Challenge, AxiosError>>;
}

export default function LeaderboardApiClient(
  context?: GetSessionOptions
): ILeaderboardApiClient {
  const client = API(context);

  async function getChallengeList(): Promise<
    ApiResult<Challenge[], AxiosError>
  > {
    try {
      const { data } = await client.get<Challenge[]>(
        API_URL_CONSTANTS.leaderboard.getChallengeList
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function retrieveChallenge(
    challenge: string | number
  ): Promise<ApiResult<Challenge, AxiosError>> {
    try {
      const { data } = await client.get<Challenge>(
        API_URL_CONSTANTS.leaderboard.retrieveChallenge(challenge)
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getLeaderboardList(
    filterChallenge?: string | number
  ): Promise<ApiResult<Leaderboard[], AxiosError>> {
    try {
      const url = filterChallenge
        ? `${API_URL_CONSTANTS.leaderboard.getLeaderboardList}?challenge=${filterChallenge}`
        : API_URL_CONSTANTS.leaderboard.getLeaderboardList;

      const { data } = await client.get<Leaderboard[]>(url);
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    getChallengeList,
    getLeaderboardList,
    retrieveChallenge,
  };
}
