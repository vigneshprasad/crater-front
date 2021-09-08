import styled from "styled-components";
import { variant } from "styled-system";

import { ResponsiveCSS, Scroll, ScrollProps } from "../../atoms";

export type ScrollVariants = "base" | "grid";

type Props = ScrollProps & {
  variant?: ScrollVariants;
};

const variants: Record<ScrollVariants, ResponsiveCSS> = {
  base: {},
  grid: { display: "grid" },
};

const StyledContainer = styled(Scroll)<Props>`
  ${variant({
    variants,
  })}
`;

const BaseLayout = ({ children, ...rest }: Props) => {
  return <StyledContainer {...rest}>{children}</StyledContainer>;
};

export default BaseLayout;
