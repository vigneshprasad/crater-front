import { Icon } from "@/common/components/atoms";
import {
  ABOUT_URL,
  LEARN_MORE_URL,
  HELP_CENTER,
} from "@/common/constants/url.constants";

export const NAV_ABOUT_LINKS = [
  {
    key: "about",
    label: "About Crater",
    route: ABOUT_URL,
  },
  {
    key: "help",
    label: "Help Center",
    route: HELP_CENTER,
  },
  {
    key: "whitepaper",
    label: "Whitepaper",
    route: LEARN_MORE_URL,
    suffixElement: <Icon icon="PopOut" size={20} />,
  },
];
