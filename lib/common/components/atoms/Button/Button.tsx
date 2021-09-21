import { ButtonHTMLAttributes, useMemo } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import { theme } from "@/common/theme";

import { Box, BoxProps, Text, TextVariants } from "../System";

type ButtonElements = "button" | "a";

type Variants = "full-width" | "dense" | "nav-button";

export type ButtonProps = Omit<BoxProps, "variant"> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: ButtonElements;
    text?: string;
    variant?: Variants;
  };

const StyledButton = styled(Box)<ButtonProps>`
  border: none;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  color: ${(props) => props.theme.colors.white[0]};
  ${variant({
    prop: "variant",
    variants: {
      "full-width": {
        height: 56,
        borderRadius: 6,
      },
      dense: {
        height: 44,
        width: "fit-content",
        borderRadius: 6,
      },
      "nav-button": {
        height: 36,
        width: "fit-content",
        borderRadius: 4,
      },
    },
  })}

  &:hover {
    background: ${(props) => props.theme.colors.accentHover};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${(props) => props.theme.colors.black[1]};
    color: ${(props) => props.theme.colors.slate};
  }
`;

export function Button({
  type = "button",
  text,
  variant: variantProp = "dense",
  ...rest
}: ButtonProps): JSX.Element {
  const { space, colors } = theme;

  const fontVariant: TextVariants = useMemo(() => {
    const map: Record<Variants, TextVariants> = {
      "full-width": "buttonLarge",
      dense: "buttonLarge",
      "nav-button": "button",
    };
    return variantProp ? map[variantProp] : "button";
  }, [variantProp]);

  return (
    <StyledButton
      bg={colors.accent}
      px={space.s}
      type={type}
      variant={variantProp}
      as="button"
      {...rest}
    >
      <Text color="inherit" textStyle={fontVariant}>
        {text}
      </Text>
    </StyledButton>
  );
}
