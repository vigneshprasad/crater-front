import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult, PageResponse } from "@/common/types/api";

import {
  CommunityMember,
  Follower,
  Webinar,
} from "../../community/types/community";
import { Reward } from "../../tokens/types/token";
import { Creator, CreatorRank } from "../types/creator";
import { CreateWebinar, StreamFormArgs } from "../types/stream";

interface ICreatorApiClient {
  getCreatorsList: (
    certified?: boolean,
    page?: number,
    pageSize?: number
  ) => Promise<ApiResult<PageResponse<Creator>, AxiosError>>;
  getCreator: (id: string) => Promise<ApiResult<Creator, AxiosError>>;
  getMyCreator: () => Promise<ApiResult<Creator, AxiosError>>;
  getCreatorBySlug: (slug: string) => Promise<ApiResult<Creator, AxiosError>>;
  getCreatorStreams: (
    creatorId: string
  ) => Promise<ApiResult<Webinar[], AxiosError>>;
  getCommunityMemebers: (
    communityId?: number
  ) => Promise<ApiResult<CommunityMember[], AxiosError>>;
  postStream: (
    stream: CreateWebinar
  ) => Promise<ApiResult<Webinar, AxiosError>>;
  postFollowCreator: (
    community: number
  ) => Promise<ApiResult<CommunityMember, AxiosError>>;
  subscribeCreator: (
    creator: number
  ) => Promise<ApiResult<Follower, AxiosError>>;
  unsubscribeCreator: (
    follower: number,
    notify: boolean
  ) => Promise<ApiResult<Follower, AxiosError>>;
  getAllRewards: (slug?: string) => Promise<ApiResult<Reward[], AxiosError>>;
  retrieveReward: (
    id: string | number
  ) => Promise<ApiResult<Reward, AxiosError>>;
  getCreatorsWithCoins: () => Promise<ApiResult<Creator[], AxiosError>>;
  getCreatorRankList: () => Promise<
    ApiResult<PageResponse<CreatorRank>, AxiosError>
  >;
}

export default function CreatorApiClient(
  context?: GetSessionOptions
): ICreatorApiClient {
  const client = API(context);

  async function getCreatorsList(
    certified = true,
    page = 1,
    pageSize = 20
  ): Promise<ApiResult<PageResponse<Creator>, AxiosError>> {
    try {
      const { data } = await API(context).get<PageResponse<Creator>>(
        `${API_URL_CONSTANTS.creator.getCreatorList}?certified=${certified}&page=${page}&page_size=${pageSize}`
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getCreator(
    id: string
  ): Promise<ApiResult<Creator, AxiosError>> {
    try {
      const { data } = await API(context).get<Creator>(
        `${API_URL_CONSTANTS.creator.getCreatorList}${id}/`
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getMyCreator(): Promise<ApiResult<Creator, AxiosError>> {
    try {
      const { data } = await API(context).get<Creator>(
        API_URL_CONSTANTS.creator.getMyCreator
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getCreatorBySlug(
    slug: string
  ): Promise<ApiResult<Creator, AxiosError>> {
    try {
      const { data } = await API(context).get<Creator>(
        API_URL_CONSTANTS.creator.retrieveCreatorSlug(slug)
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getCreatorStreams(
    creatorId: string
  ): Promise<ApiResult<Webinar[], AxiosError>> {
    try {
      const { data } = await API(context).get<Webinar[]>(
        `${API_URL_CONSTANTS.groups.getWebinars}?host=${creatorId}`
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getCommunityMemebers(
    communityId?: number
  ): Promise<ApiResult<CommunityMember[], AxiosError>> {
    const url = communityId
      ? `${API_URL_CONSTANTS.community.getCommunityMembers}?community=${communityId}`
      : API_URL_CONSTANTS.community.getCommunityMembers;

    try {
      const { data } = await API(context).get<PageResponse<CommunityMember>>(
        url
      );
      return [data.results, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function postStream(
    stream: Partial<StreamFormArgs>
  ): Promise<ApiResult<Webinar, AxiosError>> {
    try {
      const { data } = await client.post<Webinar>(
        API_URL_CONSTANTS.stream.createStream,
        stream
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function postFollowCreator(
    creator: number
  ): Promise<ApiResult<CommunityMember, AxiosError>> {
    try {
      const { data } = await client.post<CommunityMember>(
        API_URL_CONSTANTS.creator.postFollowCreator,
        {
          creator,
        }
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function subscribeCreator(
    creator: number
  ): Promise<ApiResult<Follower, AxiosError>> {
    try {
      const { data } = await client.post<Follower>(
        API_URL_CONSTANTS.creator.subscribeCreator,
        {
          creator,
        }
      );

      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getAllRewards(
    slug?: string
  ): Promise<ApiResult<Reward[], AxiosError>> {
    const url = slug
      ? `${API_URL_CONSTANTS.rewards.rewardsList}?creator__slug=${slug}`
      : API_URL_CONSTANTS.rewards.rewardsList;
    try {
      const { data } = await client.get<Reward[]>(url);
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function retrieveReward(
    id: string | number
  ): Promise<ApiResult<Reward, AxiosError>> {
    try {
      const { data } = await client.get<Reward>(
        `${API_URL_CONSTANTS.rewards.rewardsList}${id}/`
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function unsubscribeCreator(
    follower: number,
    notify: boolean
  ): Promise<ApiResult<Follower, AxiosError>> {
    try {
      const { data } = await client.patch<Follower>(
        API_URL_CONSTANTS.creator.unsubscribeCreator(follower),
        {
          notify,
        }
      );

      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getCreatorsWithCoins(): Promise<
    ApiResult<Creator[], AxiosError>
  > {
    try {
      const { data } = await client.get<Creator[]>(
        API_URL_CONSTANTS.creator.withCoins
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function getCreatorRankList(): Promise<
    ApiResult<PageResponse<CreatorRank>, AxiosError>
  > {
    try {
      const { data } = await client.get<PageResponse<CreatorRank>>(
        API_URL_CONSTANTS.creator.getCreatorRankList
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    getCreatorsList,
    getCreator,
    getMyCreator,
    getCreatorBySlug,
    getCreatorStreams,
    getCommunityMemebers,
    postStream,
    postFollowCreator,
    subscribeCreator,
    unsubscribeCreator,
    getAllRewards,
    retrieveReward,
    getCreatorsWithCoins,
    getCreatorRankList,
  };
}
