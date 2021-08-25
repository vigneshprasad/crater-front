import { MouseEventHandler } from "react";
import { useTheme } from "styled-components";

import { IconOptions } from "@/common/theme";

import { Icon } from "../Icon/Icon";
import { Grid, GridProps } from "../System";

type IProps = GridProps & {
  icon: IconOptions;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const IconButton: React.FC<IProps> = ({ icon, onClick, ...rest }) => {
  const { colors } = useTheme();
  return (
    <Grid
      h={56}
      w={56}
      borderRadius="50%"
      bg={colors.accent}
      onClick={onClick}
      cursor="pointer"
      {...rest}
    >
      <Icon m="auto auto" icon={icon} />
    </Grid>
  );
};

export default IconButton;
