import styled, { DefaultTheme } from "styled-components";
import { grid, GridProps as SystemGridProps } from "styled-system";

import { Box, BoxProps } from "./Box";

export type GridProps = BoxProps & SystemGridProps<DefaultTheme>;

export const Grid = styled(Box)<GridProps>`
  ${grid}

  display: grid;
`;
