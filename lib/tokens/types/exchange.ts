import { CoinPriceLog } from "./auctions";
import { Coin, Reward } from "./token";

export interface CoinHolding {
  id: number;
  user: string;
  coin: string;
  number_of_coins: number;
  coin_detail: Coin;
  updated_at: string;
  coin_price_log_detail: CoinPriceLog;
}

export interface UserReward {
  id: number;
  user: string;
  reward: number;
  quantity: number;
  redeemed_quantity: number;
  is_redeemed: boolean;
  reward_detail: Reward;
}
