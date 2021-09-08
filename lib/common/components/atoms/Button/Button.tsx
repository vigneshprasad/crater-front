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
  background: ${(props) => props.theme.colors.accent};
  border: none;
  cursor: pointer;
`;

export const Button = ({
  type = "button",
  text,
  children,
  ...rest
}: ButtonProps) => {
  const { space, radii } = theme;
  return (
    <StyledButton
      type={type}
      borderRadius={[radii.xxs]}
      px={[space.xs]}
      py={[space.xs]}
      as="button"
      {...rest}
    >
      <Text textStyle="button">{text}</Text>
    </StyledButton>
  );
};
