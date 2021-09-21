import { ButtonHTMLAttributes, useMemo } from "react";
import styled, { useTheme } from "styled-components";
import { variant } from "styled-system";

import { Grid } from "@/common/components/atoms";

import { Box, BoxProps, Text, TextVariants } from "../System";

type ButtonElements = "button" | "a";

type Variants = "full-width" | "dense" | "nav-button";

export type ButtonProps = Omit<BoxProps, "variant"> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: ButtonElements;
    text?: string;
    variant?: Variants;
    prefixElement?: JSX.Element;
  };

const StyledButton = styled(Box)<ButtonProps>`
  cursor: pointer;
  transition: all 200ms ease-in-out;
  color: ${(props) => props.theme.colors.white[0]};
  ${variant({
    prop: "variant",
    variants: {
      "full-width": {
        height: 56,
        borderRadius: 6,
        width: "100%",
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
  border = "none",
  variant: variantProp = "dense",
  prefixElement,
  ...rest
}: ButtonProps): JSX.Element {
  const { space, colors } = useTheme();

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
      border={border}
      variant={variantProp}
      as="button"
      {...rest}
    >
      <Grid gridTemplateColumns="min-content 1fr" gridAutoFlow="column">
        <Box>{prefixElement && prefixElement}</Box>
        <Text color="inherit" textStyle={fontVariant}>
          {text}
        </Text>
      </Grid>
    </StyledButton>
  );
}
