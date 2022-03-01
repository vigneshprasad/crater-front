import { Profile } from "next-auth";

import { Creator } from "@/creators/types/creator";

import { Reward } from "./token";

export enum BidStatus {
  PaymentPending = 5,
  Pending = 1,
  Accepted = 2,
  Rejected = 3,
  Cancelled = 4,
}

export interface Bid {
  id: number;
  creator: number;
  bidder: string;
  auction: number;
  bid_price: number;
  quantity: number;
  status: BidStatus;
  is_processed: boolean;
  payment: number;
  amount: number;
  created_at: string;
  status_detail: string;
  bidder_profile_detail: Profile;
  creator_detail: Creator;
  reward: number;
  reward_detail: Reward;
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
  minimum_bid: number;
  last_bid?: Bid;
  reward: number;
}

export interface CoinPriceLog {
  id: number;
  created_at: string;
  coin: number;
  price: number;
}

export interface BidCreatorSummary {
  total_net_worth: number;
  accepted_net_worth: number;
  total_bids: number;
  total_accepted: number;
}
