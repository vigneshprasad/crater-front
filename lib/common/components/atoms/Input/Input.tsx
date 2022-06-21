import { forwardRef, useMemo } from "react";
import styled, { useTheme } from "styled-components";
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

import { Box, BoxProps } from "../System/Box";
import { Flex, FlexProps } from "../System/Flex";
import { Text } from "../System/Text";

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
  React.InputHTMLAttributes<HTMLInputElement> & {
    prefixElement?: React.ReactNode;
    error?: string;
    boxProps?: BoxProps;
    placeholderColor?: string;
  };

export const StyledInput = styled.input<
  InputProps & { placeholderColor?: string }
>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.8rem;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white[0]};
  background: transparent;
  box-shadow: none;
  border: 1px solid transparent;
  outline: none;
  width: 100%;

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ placeholderColor, theme }) =>
      placeholderColor ? placeholderColor : theme.colors.textPlaceholder};
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
  padding: 10px 8px;
  border-radius: ${({ theme }) => theme.radii.xxxxs}px;
  align-items: center;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.accent};
  }
`;

function InputWithRef({
  inputRef,
  prefixElement,
  boxProps,
  error,
  bg,
  ...rest
}: InputProps & {
  inputRef: React.ForwardedRef<HTMLInputElement>;
}): JSX.Element {
  const { space, colors, borders } = useTheme();

  const border = useMemo(() => {
    return `1px solid ${error ? colors.error : borders.input}`;
  }, [error, colors, borders]);
  return (
    <Box {...boxProps}>
      <InputContainer bg={bg ?? colors.inputDefaultBg} border={border}>
        {prefixElement && prefixElement}
        <StyledInput ref={inputRef} {...rest} />
      </InputContainer>
      {error && (
        <Text
          px={space.xxxxs}
          py={space.xxxxs}
          color={colors.error}
          textStyle="error"
        >
          {error}
        </Text>
      )}
    </Box>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <InputWithRef {...props} inputRef={ref} />
));

Input.displayName = "Input";

Input.defaultProps = {
  type: "text",
};
