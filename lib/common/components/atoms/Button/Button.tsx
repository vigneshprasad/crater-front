import { useMemo } from "react";
import styled, { useTheme } from "styled-components";
import { variant } from "styled-system";

import { Grid, BoxProps, Text, TextVariants } from "@/common/components/atoms";

type ButtonElements = "button" | "a";

type Variants = "full-width" | "dense" | "nav-button";

export type ButtonProps = Omit<BoxProps, "variant"> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: ButtonElements;
    text?: string;
    variant?: Variants;
    prefixElement?: JSX.Element;
    suffixElement?: JSX.Element;
  };

const StyledButton = styled(Grid)<ButtonProps>`
  cursor: pointer;
  transition: all 200ms ease-in-out;
  color: ${(props) => props.theme.colors.white[0]};
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
  suffixElement,
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

  const gridTemplateColumns = useMemo(() => {
    const prefix = prefixElement ? "min-content " : "";
    const suffix = suffixElement ? " min-content" : "";

    return `${prefix}1fr${suffix}`;
  }, [prefixElement, suffixElement]);

  return (
    <StyledButton
      bg={colors.accent}
      type={type}
      px={[space.xxs, space.xxs]}
      border={border}
      variant={variantProp}
      as="button"
      alignItems="center"
      gridTemplateColumns={gridTemplateColumns}
      {...rest}
    >
      {prefixElement && prefixElement}
      <Text
        minWidth={["none", 96]}
        px={[space.xxxs, space.xxs]}
        m="auto auto"
        color="inherit"
        textStyle={fontVariant}
      >
        {text}
      </Text>
      {suffixElement && suffixElement}
    </StyledButton>
  );
}
