import styled, { useTheme } from "styled-components";
import { variant } from "styled-system";

import { Grid, GridProps } from "../../System/Grid";
import { Text } from "../../System/Text";

type Variants =
  | "iconButton"
  | "flat"
  | "outline"
  | "outline-condensed"
  | "dark-flat"
  | "transparent"
  | "displayLarge"
  | "secondary-dark-flat";

export type ButtonProps = GridProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button" | "div";
    label?: string;
    variant?: Variants;
    suffixElement?: React.ReactNode;
    prefixElement?: React.ReactNode;
  };

const StyledButton = styled(Grid)<ButtonProps>`
  cursor: pointer;
  border: none;
  color: ${({ theme }) => theme.colors.white[0]};

  ${variant({
    prop: "variant",
    variants: {
      iconButton: {
        bg: "accent",
        px: "0.6em",
        py: "calc(0.4em + 2px)",
        borderRadius: 4,
        transition: "all 0.1s ease-in",
        ":hover": {
          bg: "accentHover",
        },
        ":disabled": {
          bg: "primaryLight",
          color: "textSecondary",
        },
      },
      flat: {
        bg: "accent",
        px: "0.6em",
        py: "calc(0.4em + 2px)",
        transition: "all 0.1s ease-in",
        borderRadius: 4,
        ":hover": {
          bg: "accentHover",
        },
        ":disabled": {
          bg: "primaryLight",
          color: "textSecondary",
        },
      },
      outline: {
        fontSize: "1.3rem",
        bg: "transparent",
        border: "2px solid rgba(237, 237, 237, 0.6)",
        px: "1.2em",
        py: "0.6em",
        transition: "all 0.1s ease-in",
        borderRadius: 4,
        ":hover": {
          border: "2px solid #D5BBFF",
          color: "accentLight",
        },
      },
      "outline-condensed": {
        bg: "transparent",
        border: "2px solid rgba(237, 237, 237, 0.6)",
        px: "1.2em",
        py: "0.4em",
        transition: "all 0.1s ease-in",
        borderRadius: 4,
        ":hover": {
          border: "2px solid #D5BBFF",
          color: "accentLight",
        },
      },
      "dark-flat": {
        px: "1.2em",
        py: "calc(0.4em + 2px)",
        bg: "primaryDark",
        transition: "all 0.1s ease-in",
        borderRadius: 4,
        ":hover": {
          bg: "primaryLight",
        },
      },
      "secondary-dark-flat": {
        px: "1.2em",
        py: "calc(0.4em + 2px)",
        bg: "secondaryLight",
        transition: "all 0.1s ease-in",
        borderRadius: 4,
        ":hover": {
          bg: "secondaryDark",
        },
      },
      transparent: {
        px: "0.8em",
        py: "0.4em",
        bg: "transparent",
        transition: "all 0.1s ease-in",
        borderRadius: 4,
        ":hover": {
          bg: "primaryLight",
        },
      },
      displayLarge: {
        px: "0.8em",
        py: "0.6em",
        fontWeight: "500",
        fontSize: "1.8rem",
        transition: "all 0.1s ease-in",
        borderRadius: 4,
        bg: "secondaryDark",
        border: "2px solid #C1ABE8",
        ":hover": {
          bg: "secondaryLight",
        },
      },
    },
  })}
`;

export function Button({
  label,
  children,
  suffixElement,
  prefixElement,
  ...rest
}: ButtonProps): JSX.Element {
  const { space } = useTheme();
  return (
    <StyledButton
      fontSize="1.3rem"
      display="inline-block"
      as="button"
      fontWeight="700"
      {...rest}
    >
      <Grid
        alignItems="center"
        gridGap={space.xxxxs}
        gridTemplateAreas={`"prefix content suffix"`}
        gridTemplateColumns="max-content 1fr max-content"
      >
        {prefixElement && <Grid gridArea="prefix">{prefixElement}</Grid>}
        <Grid gridArea="content">
          {label && (
            <Text fontSize="inherit" color="inherit" fontWeight="inherit">
              {label}
            </Text>
          )}
          {children}
        </Grid>
        {suffixElement && <Grid gridArea="suffix">{suffixElement}</Grid>}
      </Grid>
    </StyledButton>
  );
}

Button.defaultProps = {
  variant: "flat",
};
