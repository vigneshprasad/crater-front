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
  | "dark-flat-no-bg"
  | "round"
  | "filter-selected"
  | "pagination"
  | "transparent"
  | "displayLarge"
  | "secondary-dark-flat"
  | "transparent-slider"
  | "text";

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
      text: {
        px: "0.2em",
        py: "0.2em",
        borderRadius: 4,
        fontSize: "1.2rem",
        bg: "transparent",
        color: "accentLight",
        transition: "all 0.1s ease-in",
        ":hover": {
          bg: "primaryLight",
        },
        ":disabled": {
          bg: "primaryLight",
          color: "textSecondary",
        },
      },
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
      "dark-flat-no-bg": {
        bg: "primaryDark",
        color: "accentLight",
        transition: "all 0.1s ease-in",
      },
      round: {
        fontSize: ["1.4rem", "1.6rem"],
        lineHeight: "2.2rem",
        p: "0.4em 0.8em",
        bg: "primaryDark",
        border: "2px solid #1C1C1E",
        borderRadius: "2em",
        transition: "all 0.1s ease-in",
        fontWeight: "500",
        ":hover": {
          bg: "primaryLight",
        },
      },
      "filter-selected": {
        fontSize: ["1.4rem", "1.6rem"],
        lineHeight: "2.2rem",
        p: "0.4em 0.8em",
        fontWeight: "500",
        bg: "accent",
        border: "2px solid #9146FF",
        borderRadius: "2em",
        transition: "all 0.1s ease-in",
        boxShadow: ["none", "0px 0px 28px #0E849F"],
        ":hover": {
          bg: "accentHover",
        },
      },
      pagination: {
        fontSize: "1.2rem",
        lineHeight: "1.8rem",
        fontWeight: 600,
        bg: "primaryDark",
        p: "0.625em",
        borderRadius: "4px",
        transition: "all 0.1s ease-in",
        color: "#C4C4C4",
        ":hover": {
          bg: "primaryLight",
          color: "accentLight",
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
      "transparent-slider": {
        py: "0.4em",
        px: "0.6em",
        bg: "transparent",
        color: "accentLight",
        transition: "all 0.1s ease-in",
        borderRadius: 4,
        ":hover": {
          bg: "rgba(255,255,255,0.1)",
          color: "white.0",
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
      fontWeight="600"
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
            <Text
              fontFamily="inherit"
              fontSize="inherit"
              color="inherit"
              fontWeight="inherit"
            >
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
