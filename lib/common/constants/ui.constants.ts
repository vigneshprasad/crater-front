import { IconOptions } from "../theme";
import { PageRoutes } from "./route.constants";
import { ABOUT_URL } from "./url.constants";

export type INavKeys =
  | "streams"
  | "community"
  | "about"
  | "creatorhub"
  | "account"
  | "logout"
  | "auctions"
  | "discord";

export type IMenuItem = {
  label: string;
  icon: IconOptions;
  url: string;
  key: INavKeys;
  iconFill: boolean;
};

export const SIDE_NAV_ITEMS: IMenuItem[] = [
  {
    label: "Streams",
    icon: "Tv",
    url: PageRoutes.home,
    key: "streams",
    iconFill: false,
  },
  {
    label: "Auctions",
    icon: "Wallet",
    url: PageRoutes.auctions,
    key: "auctions",
    iconFill: false,
  },
  {
    label: "Network",
    icon: "Community",
    url: PageRoutes.community,
    key: "community",
    iconFill: false,
  },
  {
    label: "Hub",
    icon: "Grid",
    url: PageRoutes.hub(),
    key: "creatorhub",
    iconFill: false,
  },
];

export const SIDE_NAV_MOBILE_ITEMS: IMenuItem[] = [
  {
    label: "About us",
    icon: "Globe",
    url: ABOUT_URL,
    key: "about",
    iconFill: false,
  },
];

export const USER_NAV_DROPDOWN_ITEMS: IMenuItem[] = [
  {
    label: "Account",
    icon: "AccountCircle",
    url: PageRoutes.account,
    key: "account",
    iconFill: false,
  },
  {
    label: "About",
    icon: "AtSign",
    url: ABOUT_URL,
    key: "about",
    iconFill: false,
  },
  {
    label: "Logout",
    icon: "LogOut",
    url: PageRoutes.account,
    key: "logout",
    iconFill: false,
  },
];
