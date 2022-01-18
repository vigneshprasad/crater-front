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
  text_color: string;
  title?: string;
}
