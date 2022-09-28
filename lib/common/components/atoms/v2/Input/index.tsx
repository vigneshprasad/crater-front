import { ChangeEvent, forwardRef, useCallback, useState } from "react";
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
  grid,
  GridProps,
} from "styled-system";

import { Box, BoxProps, Flex, Text, Grid } from "../../System";

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
  GridProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    boxProps?: BoxProps;
    label?: string | JSX.Element;
    maxLength?: number;
    placeholderColor?: string;
    prefixElement?: JSX.Element;
    suffixElement?: JSX.Element;
    error?: string;
    containerProps?: GridProps | BoxProps;
  };

export const StyledInput = styled.input<InputProps>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.6rem;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white[0]};
  background: transparent;
  box-shadow: none;
  border: 1px solid transparent;
  outline: none;
  width: 100%;

  outline: none;
  width: 100%;

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.6rem;
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
  ${grid}
`;

const InputContainer = styled(Grid)`
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.textQuartenary};
  }
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      boxProps,
      containerProps,
      label,
      maxLength,
      value,
      onChange,
      prefixElement,
      suffixElement,
      error,
      ...rest
    },
    ref
  ) => {
    const { colors, space, radii } = useTheme();
    const [length, setLength] = useState(value?.toString().length ?? 0);

    const handleOnChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setLength(val.length);

        onChange && onChange(event);
      },
      [onChange]
    );

    return (
      <Box {...boxProps}>
        {(label || maxLength) && (
          <Flex pb={space.xxxxs}>
            <Box flex="1">
              {label && <Text textStyle="inputLabel">{label}</Text>}
            </Box>
            <Box>
              {maxLength && (
                <Text textStyle="inputLabel" color={colors.textTertiary}>
                  {length}/{maxLength}
                </Text>
              )}
            </Box>
          </Flex>
        )}
        <InputContainer
          px={space.xxxs}
          py={space.xxxs}
          bg={colors.inputDefaultBg}
          gridTemplateColumns="max-content 1fr max-content"
          gridTemplateAreas={`"prefix input suffix"`}
          alignItems="center"
          borderRadius={radii.xxxxs}
          border={
            error
              ? `1px solid ${colors.error}`
              : `1px solid ${colors.primaryLight}`
          }
          {...containerProps}
        >
          {prefixElement && <Box gridArea="prefix">{prefixElement}</Box>}
          <StyledInput
            ref={ref}
            onChange={handleOnChange}
            gridArea="input"
            value={value}
            {...rest}
          />
          {suffixElement && <Box gridArea="suffix">{suffixElement}</Box>}
        </InputContainer>
        {error && (
          <Box py={space.xxxxxs}>
            <Text textStyle="error" color={colors.error}>
              {error}
            </Text>
          </Box>
        )}
      </Box>
    );
  }
);

Input.displayName = "Input";
