import { IconOptions } from "../theme";
import { PageRoutes } from "./route.constants";

export type INavKeys =
  | "streams"
  | "community"
  | "about"
  | "creatorhub"
  | "account"
  | "logout"
  | "tokens";

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
    label: "Tokens",
    icon: "Wallet",
    url: PageRoutes.tokens(),
    key: "tokens",
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
    label: "Creator Hub",
    icon: "Grid",
    url: PageRoutes.creatorHub,
    key: "creatorhub",
    iconFill: false,
  },
];

export const SIDE_NAV_MOBILE_ITEMS: IMenuItem[] = [
  {
    label: "About us",
    icon: "Globe",
    url: "//www.joincrater.club/",
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
    label: "About us",
    icon: "AtSign",
    url: "//www.joincrater.club/",
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

export const LEARN_MORE_URL =
  "https://crater-about.notion.site/Welcome-to-Crater-Club-03d3849b9ae940619a111a737652f41d";
