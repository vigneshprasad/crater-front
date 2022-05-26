import * as CSS from "csstype";
import { motion } from "framer-motion";
import styled, { useTheme } from "styled-components";

import { Box, BoxProps } from "../System/Box";

type IProps = BoxProps &
  React.SVGAttributes<HTMLOrSVGElement> & {
    size?: number;
    strokeWidth?: number;
    strokeColor?: CSS.Property.Color;
  };

const Circle = styled(motion.circle)``;

export default function Spinner({
  size = 44,
  strokeWidth = 2,
  strokeColor,
  ...rest
}: IProps): JSX.Element {
  const { colors } = useTheme();

  const radius = size / 2 - strokeWidth * 2;
  const circumference = radius * 2 * Math.PI;
  return (
    <Box as="svg" size={size} {...rest}>
      <Circle
        initial={{
          strokeDasharray: `${circumference} ${circumference}`,
        }}
        animate={{
          rotate: [0, 180, 360, 540, 720],
          strokeDashoffset: [
            0,
            circumference / 2,
            circumference,
            circumference / 2,
            0,
          ],
        }}
        stroke={strokeColor || colors.accent}
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transition={{
          loop: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      />
    </Box>
  );
}
