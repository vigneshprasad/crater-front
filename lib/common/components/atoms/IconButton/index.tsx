import { MouseEventHandler } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import { IconOptions, theme } from "@/common/theme";

import { Icon, IconProps } from "../Icon/Icon";
import { Box, GridProps } from "../System";

const { colors } = theme;

type Variants = "flat" | "flatNoBg" | "round" | "roundSmall";

export type IconButtonProps = GridProps & {
  icon: IconOptions;
  onClick?: MouseEventHandler<HTMLDivElement>;
  variant?: Variants | GridProps["variant"];
  iconProps?: Partial<IconProps>;
};

const Container = styled(Box)`
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
        bg: "accent",
        borderRadius: "50%",
      },
      roundSmall: {
        height: "36px",
        width: "36px",
        bg: "black.2",
        borderRadius: "50%",
        transition: "all 50ms ease-in-out",
        ":hover": {
          bg: "accent",
        },
      },
      flatNoBg: {
        height: 40,
        width: 40,
        transition: "all 50ms ease-in-out",
        borderRadius: 4,
      },
    },
  })}
`;

export default function IconButton({
  icon,
  onClick,
  iconProps,
  ...rest
}: IconButtonProps): JSX.Element {
  return (
    <Container onClick={onClick} position="relative" cursor="pointer" {...rest}>
      <Icon
        position="absolute"
        top="50%"
        right="50%"
        transform="translate(50%, -50%)"
        size={20}
        icon={icon}
        {...iconProps}
      />
    </Container>
  );
}

IconButton.defaultProps = {
  variant: "flat",
  type: "button",
};
