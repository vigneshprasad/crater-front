import { IconOptions } from "../theme";
import { PageRoutes } from "./route.constants";

export type INavKeys = "streams" | "community" | "about" | "creatorhub";

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
    label: "Network",
    icon: "Community",
    url: PageRoutes.community,
    key: "community",
  },
  {
    label: "Creator Hub",
    icon: "Grid",
    url: PageRoutes.creatorHub,
    key: "creatorhub",
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
