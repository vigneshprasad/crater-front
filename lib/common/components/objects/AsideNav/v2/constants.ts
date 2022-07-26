import { PageRoutes } from "@/common/constants/route.constants";
import { IconOptions } from "@/common/theme";

export type INavKeys = "streams" | "creators" | "leaderboard" | "hub";
export type HubNavKeys =
  | "journey"
  | "stream"
  | "auction"
  | "wallet"
  | "analytics";

export type INavItem = {
  key: INavKeys;
  icon: IconOptions;
  route: string;
  label: string;
};

export type HubNavItem = {
  heading: string;
  user?: boolean;
  items: {
    key: HubNavKeys;
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
        icon: "Tv",
        route: PageRoutes.hub("journey"),
        label: "My Creator Journey",
      },
    ],
  },
  {
    heading: "Streams",
    items: [
      {
        key: "stream",
        icon: "Tv",
        route: PageRoutes.hub("stream"),
        label: "My Streams",
      },
    ],
  },
  {
    heading: "Analytics",
    user: false,
    items: [
      {
        key: "analytics",
        icon: "Tv",
        route: PageRoutes.hub("analytics"),
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
        icon: "Tv",
        route: PageRoutes.hub("auction"),
        label: "Auction Bids",
      },
    ],
  },
  {
    heading: "Wallet",
    items: [
      {
        key: "wallet",
        icon: "Tv",
        route: PageRoutes.hub("wallet"),
        label: "My Wallet",
      },
    ],
  },
];
