import * as CSS from "csstype";
import { useTheme } from "styled-components";

import { AnimatedBox, AnimatedBoxProps } from "../Animated";

interface IProps extends AnimatedBoxProps {
  colors?: CSS.Property.Color[];
}

export default function Shimmer({
  colors,
  children,
  ...props
}: IProps): JSX.Element {
  const { colors: themeColors } = useTheme();
  const list = colors ? colors : [themeColors.black[2], themeColors.black[5]];
  return (
    <AnimatedBox
      animate={{ background: list }}
      transition={{ duration: 1, repeatType: "reverse", repeat: Infinity }}
      {...props}
    >
      {children}
    </AnimatedBox>
  );
}
