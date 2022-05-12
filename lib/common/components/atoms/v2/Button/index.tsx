import styled from "styled-components";
import { variant } from "styled-system";

import { Grid, GridProps } from "../../System/Grid";
import { Text } from "../../System/Text";

type Variants = "flat" | "outline";

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
      flat: {
        bg: "accent",
        px: "0.4em",
        py: "0.3em",
        borderRadius: 4,
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
