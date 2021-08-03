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
  TypographyProps,
  variant,
} from "styled-system";

type TextDecorationOption = "overline" | "line-through" | "underline";
type TextTransformOption = "uppercase" | "lowercase" | "capitalize";

export type BoxProps = BackgroundProps &
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
  TypographyProps & {
    textDecoration?:
      | TextDecorationOption
      | (TextDecorationOption | null | string)[];
    textTransform?:
      | TextTransformOption
      | (TextTransformOption | null | string)[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } & HTMLAttributes<any>;

const textDecoration = style({
  prop: "textDecoration",
  cssProperty: "textDecoration",
});

const textTransform = style({
  prop: "textTransform",
  cssProperty: "textTransform",
});

export const Box = styled.div<BoxProps>`
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
  ${textDecoration}
  ${textTransform}
  ${typography}
  ${variant({
    prop: "variant",
    scale: "buttons",
    variants: {
      primary: {},
    },
  })}

  box-sizing: border-box;
`;
