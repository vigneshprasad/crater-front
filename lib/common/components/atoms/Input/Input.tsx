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
} from "styled-system";

import { Flex, FlexProps } from "../System/Flex";

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
    prefixElement?: React.ReactNode;
  };

export const StyledInput = styled.input<InputProps>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2.4rem;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white[0]};
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
`;

export const InputContainer = styled(Flex)<FlexProps>`
  padding: 12px 12px;
  background: ${({ theme }) => theme.colors.black[4]};
  border-radius: ${({ theme }) => theme.radii.xxs}px;
  border: 2px solid transparent;

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

function InputWithRef({
  inputRef,
  prefixElement,
  ...rest
}: InputProps & {
  inputRef: ForwardedRef<HTMLInputElement>;
}): JSX.Element {
  return (
    <InputContainer>
      {prefixElement && prefixElement}
      <StyledInput ref={inputRef} {...rest} />
    </InputContainer>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <InputWithRef {...props} inputRef={ref} />
));

Input.displayName = "Input";

Input.defaultProps = {
  type: "text",
};
