import { Webinar } from "@/community/types/community";

export enum RewardCardTypes {
  Sale,
  Auction,
}

export interface IBaseRewardCardProps {
  cardType?: RewardCardTypes;
  webinar: Webinar;
  title: string;
  price: number;
  image: string;
  buyers: number;
  quantity: number;
  description?: string;
  onClickBuySale?: () => void;
}
