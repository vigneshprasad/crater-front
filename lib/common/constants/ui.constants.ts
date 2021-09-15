import { IconOptions } from "../theme";

export type INavKeys = "streams" | "community";

export type IMenuItem = {
  label: string;
  icon: IconOptions;
  url: string;
  key: INavKeys;
};

export const SIDE_NAV_ITEMS: IMenuItem[] = [
  {
    label: "Home",
    icon: "Tv",
    url: "/",
    key: "streams",
  },
  {
    label: "Community",
    icon: "Community",
    url: "/community/",
    key: "community",
  },
];
