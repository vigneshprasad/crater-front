import { Creator } from "../../creators/types/creator";
import { Auction } from "./auctions";

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

export interface RewardType {
  id: number;
  name: string;
  is_active: boolean;
}

export interface Reward {
  id: number;
  creator: number;
  is_active: boolean;
  name: string;
  title?: string;
  text_color: string;
  object_id: number;
  type: string;
  photo: string;
  description?: string;
  photo_mime_type: string;
  quantity: number;
  quantity_sold: number;
  active_auction?: Auction;
  creator_detail: Creator;
  type_detail: RewardType;
}
