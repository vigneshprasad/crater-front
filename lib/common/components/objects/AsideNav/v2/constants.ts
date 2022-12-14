import { PageRoutes } from "@/common/constants/route.constants";
import { IconOptions } from "@/common/theme";

export type INavKeys = "streams" | "store" | "leaderboard" | "hub";
export type HubNavHeadingKeys = "settings" | "streams" | "analytics";
export type HubNavItemKeys =
  | "journey"
  | "upcoming"
  | "past"
  | "auction"
  | "wallet"
  | "channel_statistics"
  | "club_members"
  | "profile";

export type INavItem = {
  key: INavKeys;
  icon: {
    active: IconOptions;
    inactive: IconOptions;
  };
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
    icon: {
      active: "StreamsActive",
      inactive: "StreamsInactive",
    },
    route: PageRoutes.home,
    label: "Streams",
  },
  {
    key: "store",
    icon: {
      active: "StoreActive",
      inactive: "StoreInactive",
    },
    route: PageRoutes.store(),
    label: "Store",
  },
  // {
  //   key: "leaderboard",
  //   icon: {
  //     active: "LeaderBoardActive",
  //     inactive: "LeaderBoardInactive",
  //   },
  //   route: PageRoutes.leaderboard,
  //   label: "Leaderboard",
  // },
  {
    key: "hub",
    icon: {
      active: "HubActive",
      inactive: "HubInactive",
    },
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
    user: false,
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
    key: "streams",
    heading: "Streams",
    items: [
      {
        key: "upcoming",
        icon: "Video",
        route: PageRoutes.hub("streams", "upcoming"),
        label: "Upcoming Streams",
      },
      {
        key: "past",
        icon: "Clock",
        route: PageRoutes.hub("streams", "past"),
        label: "Past Streams",
      },
    ],
  },
  {
    heading: "Analytics",
    user: false,
    items: [
      {
        key: "club_members",
        icon: "UsersFill",
        route: PageRoutes.hub("analytics", "club_members"),
        label: "Club Members",
      },
      {
        key: "channel_statistics",
        icon: "Statistics",
        route: PageRoutes.hub("analytics", "channel_statistics"),
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
