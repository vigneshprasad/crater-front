import { motion, MotionProps } from "framer-motion";
import styled from "styled-components";
import { grid, GridProps } from "styled-system";

import { Box, BoxProps } from "../System";

export type AnimatedBoxProps = BoxProps & GridProps & MotionProps;

// eslint-disable-next-line import/prefer-default-export
export const AnimatedBox = styled(
  motion(Box, { forwardMotionProps: true })
)<AnimatedBoxProps>`
  ${grid}
`;
