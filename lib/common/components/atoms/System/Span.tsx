import styled from "styled-components";

import { Box, BoxProps } from "./Box";

export type SpanProps = BoxProps & {
  as?: string;
};

export const Span = styled(Box)<SpanProps>``;

Span.defaultProps = {
  as: "span",
  display: "inline-block",
};
