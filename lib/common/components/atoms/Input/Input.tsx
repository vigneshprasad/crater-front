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

import { ResponsiveCSS } from "../System/Box";
import { Grid, GridProps } from "../System/Grid";

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
    prefixElement?: React.ReactNode;
  };

const StyledInput = styled.input<InputProps>`
  color: ${({ theme }) => theme.colors.white};
  background: transparent;
  box-shadow: none;
  border: 2px solid transparent;
  outline: none;

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

const Container = styled(Grid)<GridProps>`
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.black[3]};
  border-radius: ${({ theme }) => theme.radii.xxs}px;
  border: 2px solid transparent;

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

export const Input: React.FC<InputProps> = ({ prefixElement, ...rest }) => {
  const gridTemplateColumns = `${prefixElement && "min-content"} 1fr`;
  return (
    <Container gridTemplateColumns={gridTemplateColumns} gridGap={8}>
      {prefixElement && prefixElement}
      <StyledInput {...rest} />
    </Container>
  );
};

Input.defaultProps = {
  type: "text",
  inputType: "form",
};
