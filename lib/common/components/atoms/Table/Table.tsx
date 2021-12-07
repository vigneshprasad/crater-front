import styled from "styled-components";

import { Box, BoxProps } from "../System/Box";

export type TableProps = BoxProps & {
  as: string;
};

export const Table = styled(Box)<TableProps>``;

Table.defaultProps = { as: "table" };
