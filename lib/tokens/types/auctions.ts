import { Profile } from "next-auth";

import { Coin } from "./token";

export enum BidStatus {
  PaymentPending = 5,
  Pending = 1,
  Accepted = 2,
  Rejected = 3,
  Cancelled = 4,
}

export interface Bid {
  id: number;
  bidder: string;
  auction: number;
  bid_price: number;
  number_of_coins: number;
  bid_time: string;
  status: BidStatus;
  is_processed: boolean;
  payment: number;
  coin_detail: Coin;
  amount: number;
  created_at: string;
  status_detail: string;
  bidder_profile_detail: Profile;
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

export interface CoinPriceLog {
  id: number;
  created_at: string;
  coin: number;
  price: number;
}
