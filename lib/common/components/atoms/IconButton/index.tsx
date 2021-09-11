import { MouseEventHandler } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import { IconOptions, theme } from "@/common/theme";

import { Icon } from "../Icon/Icon";
import { Grid, GridProps } from "../System";

const { colors } = theme;

type Variants = "flat" | "round";

type IProps = GridProps & {
  icon: IconOptions;
  onClick?: MouseEventHandler<HTMLDivElement>;
  variant?: Variants;
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
    },
  })}
`;

export default function IconButton({
  icon,
  onClick,
  ...rest
}: IProps): JSX.Element {
  return (
    <Container onClick={onClick} cursor="pointer" {...rest}>
      <Icon m="auto auto" icon={icon} />
    </Container>
  );
}

IconButton.defaultProps = {
  variant: "flat",
};
