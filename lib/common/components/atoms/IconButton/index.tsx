import { MouseEventHandler } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import { IconOptions, theme } from "@/common/theme";

import { Icon, IconProps } from "../Icon/Icon";
import { Grid, GridProps } from "../System";

const { colors } = theme;

type Variants = "flat" | "round" | "roundSmall";

type IProps = GridProps & {
  icon: IconOptions;
  onClick?: MouseEventHandler<HTMLDivElement>;
  variant?: Variants;
  iconProps?: Partial<IconProps>;
};

const Container = styled(Grid)`
  ${variant({
    prop: "variant",
    variants: {
      flat: {
        height: 44,
        width: 44,
        borderRadius: 12,
        background: colors.black[4],
        transition: "all 50ms ease-in-out",
        ":hover": {
          background: colors.accent,
        },
      },
      round: {
        height: "56px",
        width: "56px",
        background: "accent",
        borderRadius: "50%",
      },
      roundSmall: {
        height: "32px",
        width: "32px",
        background: colors.black[5],
        borderRadius: "50%",
        transition: "all 50ms ease-in-out",
        ":hover": {
          background: colors.black[0],
        },
      },
    },
  })}
`;

export default function IconButton({
  icon,
  onClick,
  iconProps,
  ...rest
}: IProps): JSX.Element {
  return (
    <Container onClick={onClick} cursor="pointer" {...rest}>
      <Icon size={20} m="auto auto" icon={icon} {...iconProps} />
    </Container>
  );
}

IconButton.defaultProps = {
  variant: "flat",
};
