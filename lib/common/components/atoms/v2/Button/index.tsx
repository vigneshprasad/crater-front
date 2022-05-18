import styled from "styled-components";
import { variant } from "styled-system";

import { Grid, GridProps } from "../../System/Grid";
import { Text } from "../../System/Text";

type Variants =
  | "iconButton"
  | "flat"
  | "outline"
  | "outline-condensed"
  | "dark-flat";

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
