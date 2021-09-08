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
  ResponsiveValue,
  boxShadow,
  BoxShadowProps,
} from "styled-system";

import { CustomTheme } from "@/common/theme";

type TextDecorationOption = "overline" | "line-through" | "underline";
type TextTransformOption = "uppercase" | "lowercase" | "capitalize";

export type ResponsiveCSS = {
  [K in keyof CSS.Properties]?: ResponsiveValue<CSS.Properties[K], CustomTheme>;
};

export type BaseBoxProps = BackgroundProps &
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
  BoxShadowProps &
  TypographyProps & {
    textDecoration?:
      | TextDecorationOption
      | (TextDecorationOption | null | string)[];
    textTransform?:
      | TextTransformOption
      | (TextTransformOption | null | string)[];
    cursor?: ResponsiveValue<CSS.Property.Cursor, CustomTheme>;
    transform?: ResponsiveValue<CSS.Property.Transform, CustomTheme>;
    w?: ResponsiveValue<CSS.Property.Width | number, CustomTheme>;
    h?: ResponsiveValue<CSS.Property.Height | number, CustomTheme>;
  };

export type BoxProps = BaseBoxProps & HTMLAttributes<HTMLDivElement>;

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
  display: block;
  box-sizing: border-box;

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
  ${boxShadow}
  ${variant({
    prop: "variant",
    scale: "buttons",
    variants: {
      primary: {},
    },
  })}
`;
