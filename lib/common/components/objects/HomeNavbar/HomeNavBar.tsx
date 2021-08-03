import { theme } from "@/common/theme";

import { Grid } from "../../atoms";
import { Logo } from "../Logo";
import { NavItem } from "../NavItem";

export type MenuKeys = "clubs" | "wallet" | "account";

export const HomeNavBar: React.FC = () => {
  const { space, colors, borders } = theme;
  return (
    <Grid
      bg={colors.black[2]}
      p={`${space.xs}px`}
      alignItems="center"
      borderRight={`1px solid  ${borders.main}`}
    >
      <Logo />
      <NavItem active icon="Chart" />
    </Grid>
  );
};
