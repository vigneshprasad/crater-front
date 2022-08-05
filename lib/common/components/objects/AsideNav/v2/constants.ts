import { PageRoutes } from "@/common/constants/route.constants";
import { IconOptions } from "@/common/theme";

export type INavKeys = "streams" | "creators" | "leaderboard" | "hub";
export type HubNavHeadingKeys = "settings" | "streams";
export type HubNavItemKeys =
  | "journey"
  | "create"
  | "upcoming"
  | "auction"
  | "wallet"
  | "analytics"
  | "profile";

export type INavItem = {
  key: INavKeys;
  icon: IconOptions;
  route: string;
  label: string;
};

export type HubNavItem = {
  key?: HubNavHeadingKeys;
  heading: string;
  user?: boolean;
  items: {
    key: HubNavItemKeys;
    icon: IconOptions;
    route: string;
    label: string;
  }[];
};

export const NAV_ITEMS: INavItem[] = [
  {
    key: "streams",
    icon: "Tv",
    route: PageRoutes.home,
    label: "Streams",
  },
  {
    key: "creators",
    icon: "ViewerCount",
    route: PageRoutes.community,
    label: "Creators",
  },
  {
    key: "leaderboard",
    icon: "Trophy",
    route: PageRoutes.leaderboard,
    label: "Leaderboard",
  },
  {
    key: "hub",
    icon: "Hub",
    route: PageRoutes.hub(),
    label: "Hub",
  },
];

export const HUB_NAV_ITEMS: HubNavItem[] = [
  {
    heading: "Journey",
    items: [
      {
        key: "journey",
        icon: "Journey",
        route: PageRoutes.hub(undefined, "journey"),
        label: "My Creator Journey",
      },
    ],
  },
  {
    key: "settings",
    heading: "Account Settings",
    items: [
      {
        key: "profile",
        icon: "Profile",
        route: PageRoutes.hub("settings", "profile"),
        label: "Profile Details",
      },
    ],
  },
  {
    key: "settings",
    heading: "Streams",
    items: [
      {
        key: "create",
        icon: "CameraLive",
        route: PageRoutes.hub("streams", "create"),
        label: "Create Stream",
      },
      {
        key: "upcoming",
        icon: "Video",
        route: PageRoutes.hub("streams", "upcoming"),
        label: "Upcoming Streams",
      },
    ],
  },
  {
    heading: "Analytics",
    user: false,
    items: [
      {
        key: "analytics",
        icon: "Statistics",
        route: PageRoutes.hub(undefined, "analytics"),
        label: "Channel Statistics",
      },
    ],
  },
  {
    heading: "Auctions",
    user: false,
    items: [
      {
        key: "auction",
        icon: "Auction",
        route: PageRoutes.hub(undefined, "auction"),
        label: "Auction Bids",
      },
    ],
  },
  {
    heading: "Wallet",
    items: [
      {
        key: "wallet",
        icon: "Wallet",
        route: PageRoutes.hub(undefined, "wallet"),
        label: "My Wallet",
      },
    ],
  },
];
