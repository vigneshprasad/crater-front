import { IconOptions } from "../theme";
import { PageRoutes } from "./route.constants";

export type INavKeys = "streams" | "community" | "about";

export type IMenuItem = {
  label: string;
  icon: IconOptions;
  url: string;
  key: INavKeys;
};

export const SIDE_NAV_ITEMS: IMenuItem[] = [
  {
    label: "Streams",
    icon: "Tv",
    url: PageRoutes.home,
    key: "streams",
  },
  {
    label: "Community",
    icon: "Community",
    url: PageRoutes.community,
    key: "community",
  },
];

export const SIDE_NAV_MOBILE_ITEMS: IMenuItem[] = [
  {
    label: "About Us",
    icon: "Globe",
    url: "//www.joincrater.club/",
    key: "about",
  },
];
