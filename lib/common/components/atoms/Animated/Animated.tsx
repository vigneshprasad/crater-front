import { motion } from "framer-motion";
import styled from "styled-components";
import { grid, GridProps } from "styled-system";

import { Box, BoxProps } from "../System";

export type AnimatedBoxProps = BoxProps & GridProps;

// eslint-disable-next-line import/prefer-default-export
export const AnimatedBox = styled(motion(Box))<AnimatedBoxProps>`
  ${grid}
`;
