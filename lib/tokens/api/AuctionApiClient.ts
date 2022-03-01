import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";

import { Auction, Bid } from "../types/auctions";

interface IAuctionApiClient {
  postBid: (bid: Partial<Bid>) => Promise<ApiResult<Bid, AxiosError>>;
  retrieveBid: (id: string | number) => Promise<ApiResult<Bid, AxiosError>>;
  acceptBid: (bid: string | number) => Promise<ApiResult<Bid, AxiosError>>;
  retrieveAuction: (
    id: string | number
  ) => Promise<ApiResult<Auction, AxiosError>>;
}

export default function AuctionApiClient(
  context?: GetSessionOptions
): IAuctionApiClient {
  const client = API(context);

  async function postBid(
    bid: Partial<Bid>
  ): Promise<ApiResult<Bid, AxiosError>> {
    try {
      const { data } = await client.post<Bid>(
        API_URL_CONSTANTS.auctions.postBid,
        JSON.stringify(bid)
      );

      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function retrieveBid(
    id: string | number
  ): Promise<ApiResult<Bid, AxiosError>> {
    try {
      const { data } = await client.get<Bid>(
        API_URL_CONSTANTS.auctions.retrieveBid(id)
      );

      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function acceptBid(
    bid: string | number
  ): Promise<ApiResult<Bid, AxiosError>> {
    try {
      const { data } = await client.post<Bid>(
        API_URL_CONSTANTS.auctions.acceptBid(bid)
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function retrieveAuction(
    id: number | string
  ): Promise<ApiResult<Auction, AxiosError>> {
    try {
      const { data } = await client.get<Auction>(
        API_URL_CONSTANTS.auctions.retrievAuction(id)
      );

      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    postBid,
    retrieveBid,
    acceptBid,
    retrieveAuction,
  };
}
