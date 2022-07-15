import { Icon } from "@/common/components/atoms";
import {
  ABOUT_URL,
  LEARN_MORE_URL,
  HELP_CENTER,
  BLOG_URL,
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
    key: "blog",
    label: "Blog",
    route: BLOG_URL,
  },
  {
    key: "whitepaper",
    label: "About",
    route: LEARN_MORE_URL,
    suffixElement: <Icon icon="PopOut" size={20} />,
  },
];
