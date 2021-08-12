import * as CSS from "csstype";
import styled from "styled-components";
import { variant } from "styled-system";

import { Scroll, ScrollProps } from "../../atoms";

export type ScrollVariants = "base" | "grid";

type Props = ScrollProps & {
  variant?: ScrollVariants;
};

const variants: Record<ScrollVariants, CSS.Properties> = {
  base: {},
  grid: { display: "grid" },
};

const StyledContainer = styled(Scroll)<Props>`
  ${variant({
    variants,
  })}
`;

const BaseLayout: React.FC<Props> = ({ children, ...rest }) => {
  return <StyledContainer {...rest}>{children}</StyledContainer>;
};

export default BaseLayout;
