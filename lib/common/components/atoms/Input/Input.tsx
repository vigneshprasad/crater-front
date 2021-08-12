import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import {
  BackgroundProps,
  background,
  ColorProps,
  color,
  ColorStyleProps,
  colorStyle,
  FlexboxProps,
  flex,
  LayoutProps,
  layout,
  OpacityProps,
  opacity,
  PositionProps,
  position,
  SpaceProps,
  space,
  TypographyProps,
  typography,
  TextStyleProps,
  textStyle,
  BorderProps,
  border,
  variant,
} from "styled-system";

import { theme as BaseTheme } from "@/common/theme";

import { ResponsiveCSS } from "..";

export type InputVariants = "form";

const { fonts } = BaseTheme;

export const variants: Record<InputVariants, ResponsiveCSS> = {
  form: {
    fontSize: ["1.4rem"],
    fontWeight: 600,
    fontFamily: fonts.body,
  },
};

export type InputProps = BackgroundProps &
  ColorProps &
  ColorStyleProps &
  FlexboxProps &
  LayoutProps &
  OpacityProps &
  PositionProps &
  SpaceProps &
  TextStyleProps &
  TypographyProps &
  BorderProps &
  InputHTMLAttributes<HTMLInputElement> & {
    inputType?: InputVariants;
  };

export const Input = styled.input<InputProps>`
  padding: 16px 20px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.black[3]};
  box-shadow: none;
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.radii.xxs}px;
  outline: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.accent};
  }

  &::placeholder {
    font-size: 1.1rem;
    font-variation-settings: "wght" 700;
    text-transform: uppercase;
  }

  ${background}
  ${color}
  ${colorStyle}
  ${flex}
  ${layout}
  ${opacity}
  ${position}
  ${space}
  ${textStyle}
  ${typography}
  ${border}
  ${variant({
    prop: "inputType",
    variants,
  })}
`;

Input.defaultProps = {
  type: "text",
  inputType: "form",
};
