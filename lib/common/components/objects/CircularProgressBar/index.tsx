import { useTheme } from "styled-components";

import { Box, BoxProps } from "../../atoms";

interface IProps extends BoxProps {
  size: number;
  strokeWidth: number;
  percentage: number;
  backgroundColor: string;
  strokeColor: string;
  text?: string;
}

export default function CircularProgressBar({
  size,
  strokeWidth,
  percentage,
  backgroundColor,
  strokeColor,
  text,
  ...rest
}: IProps): JSX.Element {
  const { colors, fonts } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <Box {...rest}>
      <svg width={size} height={size} viewBox={viewBox}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />

        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          fontSize="2.4em"
          fontWeight={500}
          fontFamily={fonts.heading}
          fill={colors.textPrimary}
        >
          {text ?? `${percentage}%`}
        </text>
      </svg>
    </Box>
  );
}
