import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
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
import { Flex, FlexProps } from "../System/Flex";

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
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white};
  background: transparent;
  box-shadow: none;
  border: 2px solid transparent;
  outline: none;
  width: 100%;

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

const Container = styled(Flex)<FlexProps>`
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.black[3]};
  border-radius: ${({ theme }) => theme.radii.xxs}px;
  border: 2px solid transparent;

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

const InputWithRef: React.FC<
  InputProps & { inputRef: ForwardedRef<HTMLInputElement> }
> = ({ inputRef, prefixElement, ...rest }) => {
  return (
    <Container>
      {prefixElement && prefixElement}
      <StyledInput ref={inputRef} {...rest} />
    </Container>
  );
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <InputWithRef {...props} inputRef={ref} />
));

Input.displayName = "Input";

Input.defaultProps = {
  type: "text",
  inputType: "form",
};
