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
