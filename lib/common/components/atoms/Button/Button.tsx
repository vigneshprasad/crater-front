import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

import { theme } from "@/common/theme";

import { Box, BoxProps, Text } from "../System";

type ButtonElements = "button" | "a";

export type ButtonProps = BoxProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: ButtonElements;
    text?: string;
  };

const StyledButton = styled(Box)<ButtonProps>`
  height: 48px;
  background: ${(props) => props.theme.colors.accent};
  border: none;
  cursor: pointer;
  max-width: fit-content;
  transition: all 200ms ease-in-out;
  color: ${(props) => props.theme.colors.white};

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
  children,
  ...rest
}: ButtonProps): JSX.Element {
  const { space, radii } = theme;
  return (
    <StyledButton
      px={space.s}
      type={type}
      borderRadius={[radii.xxs]}
      as="button"
      {...rest}
    >
      <Text color="inherit" textStyle="button">
        {text}
      </Text>
    </StyledButton>
  );
}
