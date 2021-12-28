import { Creator } from "../../creators/types/creator";

export interface CoinDisplayMeta {
  symbol: string;
}

export interface Coin {
  creator_detail: Creator;
  id: number;
  name: string;
  is_active: boolean;
  display: CoinDisplayMeta;
}

export enum BidStatus {
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
  CANCELLED = 4,
}

export interface Bid {
  id: number;
  bidder: string;
  auction: number;
  bid_price: number;
  number_of_coins: number;
  bid_time: string;
  status: BidStatus;
}

export interface Auction {
  id: number;
  coin: number;
  start: string;
  end: string;
  expires_at: string;
  base_price: number;
  number_of_coins: number;
  coins_sold: number;
}

export interface Reward {
  id: number;
  creator: number;
  name: string;
  quantity: number;
  remaining_quantity: number;
  number_of_coins: number;
  type: string;
  object_id: number;
  photo: string;
  is_active: boolean;
  creator_coin_detail: Coin;
  description?: string;
  photo_mime_type: string;
}
