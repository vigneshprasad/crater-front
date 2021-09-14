import styled from "styled-components";

import { IconOptions } from "@/common/theme";

import { Grid, Link } from "../../atoms";
import { Icon } from "../../atoms/Icon";

export type INavItemProps = {
  active: boolean;
  icon: IconOptions;
  url: string;
};

const StyledIcon = styled(Icon)`
  margin: auto auto;
`;

export function NavItem({ icon, url }: INavItemProps): JSX.Element {
  return (
    <Link href={url}>
      <Grid width={[56]} height={[56]}>
        <StyledIcon icon={icon} color="transparent" />
      </Grid>
    </Link>
  );
}
