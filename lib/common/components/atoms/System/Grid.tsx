import styled from "styled-components";
import { grid, GridProps as SystemGridProps, compose } from "styled-system";

import { Box, BoxProps } from "./Box";

export type GridProps = BoxProps & SystemGridProps;

export const Grid = styled(Box)<GridProps>(
  {
    display: "grid",
  },
  compose(grid)
);
