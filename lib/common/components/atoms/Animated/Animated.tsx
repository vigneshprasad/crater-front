import * as CSS from "csstype";
import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";
import styled from "styled-components";
import {
  background,
  BackgroundProps,
  ButtonStyleProps,
  color,
  borders,
  BorderProps,
  ColorProps,
  colorStyle,
  ColorStyleProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  style,
  textStyle,
  TextStyleProps,
  typography,
  ResponsiveValue,
} from "styled-system";

export type AnimatedBoxProps = BackgroundProps &
  ButtonStyleProps &
  ColorProps &
  ColorStyleProps &
  FlexboxProps &
  LayoutProps &
  OpacityProps &
  PositionProps &
  SpaceProps &
  TextStyleProps &
  BorderProps &
  MotionProps &
  HTMLAttributes<HTMLDivElement> & {
    w?: ResponsiveValue<CSS.Property.Width>;
    h?: ResponsiveValue<CSS.Property.Height>;
  };

const w = style({
  prop: "w",
  cssProperty: "width",
});

const h = style({
  prop: "h",
  cssProperty: "height",
});

export const AnimatedBox = styled(motion.div)<AnimatedBoxProps>`
  ${w}
  ${h}
  ${borders}
  ${background}
  ${color}
  ${colorStyle}
  ${flexbox}
  ${layout}
  ${opacity}
  ${position}
  ${space}
  ${textStyle}
  ${typography}
`;
