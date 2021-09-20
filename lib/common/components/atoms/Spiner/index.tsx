import * as CSS from "csstype";
import { motion } from "framer-motion";
import styled, { useTheme } from "styled-components";

interface IProps {
  size?: number;
  strokeWidth?: number;
  strokeColor?: CSS.Property.Color;
}

const Circle = styled(motion.circle)``;

export default function Spinner({
  size = 44,
  strokeWidth = 4,
  strokeColor,
}: IProps): JSX.Element {
  const { colors } = useTheme();

  const radius = size / 2 - strokeWidth * 2;
  const circumference = radius * 2 * Math.PI;
  return (
    <svg height="48" width="48">
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
        strokeWidth="4"
        fill="transparent"
        r={radius}
        cx="24"
        cy="24"
        transition={{
          loop: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
