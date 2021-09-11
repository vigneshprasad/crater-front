import { motion } from "framer-motion";
import styled from "styled-components";
import { grid, GridProps } from "styled-system";

import { Box, BoxProps } from "../System";

export type AnimatedBoxProps = BoxProps & GridProps;

export const AnimatedBox = styled(motion(Box))<AnimatedBoxProps>`
  ${grid}
`;
