import * as CSS from "csstype";
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
    cursor?: CSS.Property.Cursor | CSS.Property.Cursor[];
    transform?: CSS.Property.Transform | CSS.Property.Transform[];
    w?: CSS.Property.Width | CSS.Property.Width[];
    h?: CSS.Property.Height | CSS.Property.Height[];
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

const cursor = style({
  prop: "cursor",
  cssProperty: "cursor",
});

const transform = style({
  prop: "transform",
  cssProperty: "transform",
});

const w = style({
  prop: "w",
  cssProperty: "width",
});

const h = style({
  prop: "h",
  cssProperty: "height",
});

export const Box = styled.div<BoxProps>`
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
  ${textDecoration}
  ${textTransform}
  ${cursor}
  ${transform}
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
