import { CoinPriceLog } from "./auctions";
import { Coin } from "./token";

export interface CoinHolding {
  id: number;
  user: string;
  coin: string;
  number_of_coins: number;
  coin_detail: Coin;
  updated_at: string;
  coin_price_log_detail: CoinPriceLog;
}
