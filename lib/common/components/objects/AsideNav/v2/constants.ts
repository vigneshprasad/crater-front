import { PageRoutes } from "@/common/constants/route.constants";
import { IconOptions } from "@/common/theme";

export type INavKeys = "streams" | "creators" | "leaderboard" | "hub";

export type INavItem = {
  key: INavKeys;
  icon: IconOptions;
  route: string;
  label: string;
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
