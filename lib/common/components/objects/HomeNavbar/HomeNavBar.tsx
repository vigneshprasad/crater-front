import { IconOptions, theme } from "@/common/theme";

import { Grid } from "../../atoms";
import { Logo } from "../Logo";
import { NavItem } from "../NavItem";

export type MenuKeys = "clubs" | "wallet" | "account";

export type INavItem = {
  icon: IconOptions;
  slug: MenuKeys;
  url: string;
};

export type INavbarProps = {
  active: MenuKeys;
  items: INavItem[];
};

export const HomeNavBar: React.FC<INavbarProps> = ({ active, items }) => {
  const { space, colors, borders } = theme;

  return (
    <Grid
      bg={colors.black[2]}
      p={`${space.xs}px`}
      borderRight={`1px solid ${borders.main}`}
      gridRowGap={space.xs}
      gridTemplateRows="56px 1fr 1fr"
      justifyItems="center"
      alignItems="start"
    >
      <Logo />
      <Grid
        gridTemplateColumns="1fr"
        gridTemplateRows={`repeat(${items.length}, 56px)`}
      >
        {items.map((menu) => (
          <NavItem
            key={menu.slug}
            icon={menu.icon}
            url={menu.url}
            active={active === menu.slug}
          />
        ))}
      </Grid>
    </Grid>
  );
};
