import { IconOptions } from "../theme";

export type IMenuItem = {
  label: string;
  icon: IconOptions;
  url: string;
  key: string;
};

export const SIDE_NAV_ITEMS: IMenuItem[] = [
  {
    label: "Home",
    icon: "Tv",
    url: "/home/clubs",
    key: "clubs",
  },
];
