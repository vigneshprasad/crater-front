import DefaultAvatar from "public/images/img_default_avatar.png";

import { useUser } from "@/auth/hooks";
import { IconOptions, theme } from "@/common/theme";

import { Avatar, Grid, Link } from "../../atoms";
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

export const HomeNavBar = ({ active, items }: INavbarProps): JSX.Element => {
  const { space, colors, borders } = theme;
  const { user } = useUser();

  const photo = user?.photo ? user?.photo : DefaultAvatar;

  return (
    <Grid
      bg={colors.black[2]}
      p={`${space.xs}px`}
      borderRight={`1px solid ${borders.main}`}
      gridRowGap={space.xs}
      gridTemplateRows="56px 1fr min-content"
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
      {user && (
        <Link href="/home/account/">
          <Avatar size={48} image={photo} alt={user.name} />
        </Link>
      )}
    </Grid>
  );
};
