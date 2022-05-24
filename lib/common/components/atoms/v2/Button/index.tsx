import styled from "styled-components";
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
  | "pagination";

export type ButtonProps = GridProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button" | "div";
    label?: string;
    variant?: Variants;
  };

const StyledButton = styled(Grid)<ButtonProps>`
  cursor: pointer;
  border: none;
  font-size: 1.4rem;
  font-weight: 500;
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
        px: "1.2em",
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
        fontSize: "1.4rem",
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
        fontSize: "1.3rem",
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
        fontSize: "1.6rem",
        lineHeight: "2.2rem",
        px: "1.25em",
        py: "0.625em",
        bg: "primaryDark",
        border: "2px solid #1C1C1E",
        borderRadius: "36px",
        transition: "all 0.1s ease-in",
        ":hover": {
          bg: "accent",
        },
      },
      "filter-selected": {
        fontSize: "1.6rem",
        lineHeight: "2.2rem",
        px: "1.25em",
        py: "0.625em",
        bg: "accent",
        border: "2px solid #9146FF",
        borderRadius: "36px",
        transition: "all 0.1s ease-in",
        boxShadow: "0px 0px 28px #0E849F",
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
    },
  })}
`;

export function Button({ label, children, ...rest }: ButtonProps): JSX.Element {
  return (
    <StyledButton display="inline-block" as="button" {...rest}>
      {label && (
        <Text fontSize="inherit" color="inherit" fontWeight="500">
          {label}
        </Text>
      )}
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  variant: "flat",
};
