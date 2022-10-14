import styled from "styled-components";
import {
  background,
  borders,
  boxShadow,
  color,
  colorStyle,
  compose,
  flexbox,
  grid,
  layout,
  opacity,
  position,
  space,
  style,
  textStyle,
  typography,
} from "styled-system";

import { BaseBoxProps } from "../System";

export type DialogProps = BaseBoxProps &
  React.DialogHTMLAttributes<HTMLDialogElement> & {
    as?: "dialog";
    backdropColor?: string;
  };

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

const contain = style({
  prop: "contain",
  cssProperty: "contain",
});

const transition = style({
  prop: "transition",
  cssProperty: "transition",
});

const pointerEvents = style({
  prop: "pointerEvents",
  cssProperty: "pointerEvents",
});

export const Dialog = styled.div<DialogProps>`
  box-sizing: border-box;

  &::backdrop {
    background-color: ${({ backdropColor, theme }) =>
      backdropColor ?? theme.colors.modalOverlay};
  }

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
    scrollBehavior,
    contain,
    transition,
    pointerEvents
  )}
`;

Dialog.defaultProps = {
  as: "dialog",
};
