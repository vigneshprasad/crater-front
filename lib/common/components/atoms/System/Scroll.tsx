import * as CSS from "csstype";
import styled from "styled-components";
import { variant } from "styled-system";

import { Box, BoxProps } from "./Box";

export type ScrollVariants = "vertical" | "horizontal";

const variants: Record<ScrollVariants, CSS.Properties> = {
  vertical: {
    overflowY: "auto",
  },
  horizontal: {
    overflowX: "auto",
  },
};

export type ScrollProps = BoxProps & {
  scroll?: ScrollVariants;
};

const Container = styled(Box)<ScrollProps>`
  width: "100%";
  height: "100%";
  overflow: "hidden";
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
