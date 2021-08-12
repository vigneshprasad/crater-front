import styled from "styled-components";
import { variant, grid, GridProps } from "styled-system";

import { Box, BoxProps, ResponsiveCSS } from "./Box";

export type ScrollVariants = "vertical" | "horizontal";

const variants: Record<ScrollVariants, ResponsiveCSS> = {
  vertical: {
    overflowY: "auto",
  },
  horizontal: {
    overflowX: "auto",
  },
};

export type ScrollProps = BoxProps &
  GridProps & {
    scroll?: ScrollVariants;
  };

const Container = styled(Box)<ScrollProps>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${grid}
  ${variant({
    prop: "scroll",
    variants,
  })}
`;

export const Scroll: React.FC<ScrollProps> = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

Scroll.defaultProps = {
  scroll: "vertical",
};
