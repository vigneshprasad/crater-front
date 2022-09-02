import { PageRoutes } from "@/common/constants/route.constants";

export type StoreTabKeys = "auctions" | "buy-now";

export type IStoreItem = {
  key: StoreTabKeys;
  route: string;
  label: string;
};

export const STORE_ITEMS: IStoreItem[] = [
  {
    key: "auctions",
    route: PageRoutes.store("auctions"),
    label: "Auctions",
  },
  {
    key: "buy-now",
    route: PageRoutes.store("buy-now"),
    label: "Buy Now",
  },
];

export enum RewardSalePaymentType {
  INR = 1,
  Learn = 2,
}

export interface Seller {
  id: number;
  user: string;
  is_subscriber: boolean;
  profile_detail: {
    id: number;
    name: string;
    photo: string | null;
  };
}

export interface RewardSale {
  id: number;
  payment_type: RewardSalePaymentType;
  price: number;
  quantity: number;
  quantity_sold: number;
  reward: number;
}

export interface SaleItem {
  id: number;
  creator: number;
  title: string;
  description?: string;
  photo: string | null;
  creator_detail: {
    id: number;
    name: string;
  };
  reward_sale_details: RewardSale[];
}
