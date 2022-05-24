import * as CSS from "csstype";
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
  ResponsiveValue,
  boxShadow,
  BoxShadowProps,
  grid,
  GridProps,
  compose,
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
  GridProps &
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
    placeItems?: ResponsiveValue<CSS.Property.PlaceItems, CustomTheme>;
    placeContent?: ResponsiveValue<CSS.Property.PlaceContent, CustomTheme>;
    visibility?: ResponsiveValue<CSS.Property.Visibility, CustomTheme>;
    wordBreak?: ResponsiveValue<CSS.Property.WordBreak, CustomTheme>;
    float?: ResponsiveValue<CSS.Property.Float, CustomTheme>;
    clear?: ResponsiveValue<CSS.Property.Clear, CustomTheme>;
    scrollBehavior?: ResponsiveValue<CSS.Property.ScrollBehavior, CustomTheme>;
  };

export type BoxProps = BaseBoxProps & React.HTMLAttributes<HTMLDivElement>;

const textDecoration = style({
  prop: "textDecoration",
  cssProperty: "textDecoration",
});

const textTransform = style({
  prop: "textTransform",
  cssProperty: "textTransform",
});

const scrollBehavior = style({
  prop: "scrollBehavior",
  cssProperty: "scrollBehavior",
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

const placeItems = style({
  prop: "placeItems",
  cssProperty: "placeItems",
});

const placeContent = style({
  prop: "placeContent",
  cssProperty: "placeContent",
});

const visibility = style({
  prop: "visibility",
  cssProperty: "visibility",
});

const wordBreak = style({
  prop: "wordBreak",
  cssProperty: "wordBreak",
});

const float = style({
  prop: "float",
  cssProperty: "float",
});

const clear = style({
  prop: "clear",
  cssProperty: "clear",
});

export const Box = styled.div<BoxProps>`
  display: block;
  box-sizing: border-box;

  ${compose(
    w,
    h,
    borders,
    background,
    color,
    colorStyle,
    flexbox,
    layout,
    grid,
    opacity,
    position,
    space,
    textStyle,
    textDecoration,
    textTransform,
    cursor,
    transform,
    typography,
    boxShadow,
    placeItems,
    placeContent,
    visibility,
    wordBreak,
    float,
    clear,
    scrollBehavior
  )}
`;
