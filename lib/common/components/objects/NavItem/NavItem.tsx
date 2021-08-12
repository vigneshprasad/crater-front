import styled from "styled-components";

import { IconOptions } from "@/common/theme";

import { Grid } from "../../atoms";
import { Icon } from "../../atoms/Icon";
import Link from "../../atoms/Link";

export type INavItemProps = {
  active: boolean;
  icon: IconOptions;
  url: string;
};

const StyledIcon = styled(Icon)`
  margin: auto auto;
`;

export const NavItem: React.FC<INavItemProps> = ({ icon, url }) => {
  return (
    <Link href={url}>
      <Grid width={[56]} height={[56]}>
        <StyledIcon icon={icon} color="transparent" />
      </Grid>
    </Link>
  );
};
