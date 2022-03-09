import styled from "styled-components";

import { Box, BoxProps } from "./Box";

export type HorizontalRuleProps = BoxProps & {
  as?: "hr" | string;
};

export const Hr = styled(Box)<HorizontalRuleProps>``;

Hr.defaultProps = {
  as: "hr",
  borderColor: "rgba(228, 228, 228, 0.1)",
  w: "100%",
};
