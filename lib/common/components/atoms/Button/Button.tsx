import { useMemo } from "react";
import styled, { useTheme } from "styled-components";
import { variant } from "styled-system";

import { Grid, BoxProps, Text, TextVariants } from "@/common/components/atoms";

import { TextProps } from "../System";

type ButtonElements = "button" | "a";

type Variants =
  | "full-width"
  | "dense"
  | "nav-button"
  | "outline-small"
  | "small"
  | "round"
  | "round-secondary"
  | "full-width-secondary"
  | "green-success"
  | "red-error";

export type ButtonProps = Omit<BoxProps, "variant"> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: ButtonElements;
    text?: string;
    variant?: Variants;
    prefixElement?: JSX.Element;
    suffixElement?: JSX.Element;
    textProps?: TextProps;
  };

const StyledButton = styled(Grid)<ButtonProps>`
  cursor: pointer;
  transition: all 200ms ease-in-out;
  color: ${(props) => props.theme.colors.white[0]};
  border-width: 2px;
  border-style: solid;

  &:hover {
    background: ${(props) => props.theme.colors.accentHover};
    border-color: ${(props) => props.theme.colors.accentHover};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${(props) => props.theme.colors.black[1]};
    color: ${(props) => props.theme.colors.slate};
    border-color: ${(props) => props.theme.colors.black[1]};
  }

  ${variant({
    prop: "variant",
    variants: {
      "full-width": {
        minHeight: 56,
        borderRadius: 6,
        width: "100%",
      },
      dense: {
        minHeight: 44,
        width: "fit-content",
        borderRadius: 6,
      },
      "nav-button": {
        minHeight: 36,
        width: "fit-content",
        borderRadius: 4,
      },
      "outline-small": {
        minHeight: 34,
        width: "fit-content",
        borderColor: "#808191",
      },
      small: {
        minHeight: 32,
        width: "fit-content",
        borderRadius: 4,
      },
      round: {
        minHeight: 32,
        width: "fit-content",
        borderRadius: 50,
      },
      "round-secondary": {
        minHeight: 32,
        width: "max-content",
        borderRadius: 50,
        ":hover": {
          bg: "white.1",
          borderColor: "white.1",
          color: "black.2",
        },
        ":disabled": {
          bg: "white.1",
          borderColor: "white.1",
          color: "black.2",
        },
      },
      "full-width-secondary": {
        minHeight: 44,
        borderRadius: 6,
        width: "100%",
      },
      "green-success": {
        bg: "greenSuccess",
        borderColor: "greenSuccess",
        ":hover": {
          bg: "greenDeep",
          borderColor: "greenDeep",
        },
      },
      "red-error": {
        bg: "error",
        borderColor: "error",
        ":hover": {
          bg: "errorDeep",
          borderColor: "errorDeep",
        },
      },
    },
  })}
`;

export function Button({
  type = "button",
  text,
  variant: variantProp = "dense",
  prefixElement,
  suffixElement,
  textProps,
  ...rest
}: ButtonProps): JSX.Element {
  const { colors, radii } = useTheme();

  const fontVariant: TextVariants = useMemo(() => {
    const map: Record<Variants, TextVariants> = {
      "full-width": "buttonLarge",
      dense: "buttonLarge",
      "nav-button": "button",
      "outline-small": "button",
      small: "button",
      round: "button",
      "round-secondary": "button",
      "full-width-secondary": "button",
      "green-success": "buttonLarge",
      "red-error": "buttonLarge",
    };
    return variantProp ? map[variantProp] : "button";
  }, [variantProp]);

  const bg: string = useMemo(() => {
    const map: Record<Variants, string> = {
      dense: colors.accent,
      "full-width": colors.accent,
      "nav-button": colors.accent,
      "outline-small": "transparent",
      small: colors.accent,
      round: colors.accent,
      "round-secondary": colors.accent,
      "full-width-secondary": colors.accent,
      "green-success": colors.greenSuccess,
      "red-error": colors.error,
    };
    return variantProp ? map[variantProp] : "button";
  }, [variantProp, colors]);

  const gridTemplateColumns = useMemo(() => {
    const prefix = prefixElement ? "min-content " : "";
    const suffix = suffixElement ? " min-content" : "";

    return `${prefix}1fr${suffix}`;
  }, [prefixElement, suffixElement]);

  return (
    <StyledButton
      bg={bg}
      borderRadius={radii.xxxs}
      type={type}
      px={["0.5em"]}
      borderColor={colors.accent}
      variant={variantProp}
      as="button"
      alignItems="center"
      gridTemplateColumns={gridTemplateColumns}
      {...rest}
    >
      {prefixElement && prefixElement}
      <Text
        minWidth={["none", 96]}
        px={["0.5em"]}
        py={["0.6em"]}
        m="auto auto"
        color="inherit"
        textStyle={fontVariant}
        {...textProps}
      >
        {text}
      </Text>
      {suffixElement && suffixElement}
    </StyledButton>
  );
}
