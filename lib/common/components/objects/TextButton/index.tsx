import styled, { useTheme } from "styled-components";

import { Box, Text, TextProps, BoxProps } from "../../atoms";

interface IProps {
  label: string;
  color?: TextProps["color"];
  onClick?: BoxProps["onClick"];
}

const Container = styled(Box)`
  padding: ${({ theme }) => `${theme.space.xxxs}px ${theme.space.xxs}px`};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.xxxs}px;

  &:hover {
    background: ${({ theme }) => theme.colors.black[2]};
  }
`;

export default function TextButton({
  label,
  onClick,
  ...rest
}: IProps): JSX.Element {
  const { colors } = useTheme();
  return (
    <Container onClick={onClick}>
      <Text color={colors.accent} {...rest}>
        {label}
      </Text>
    </Container>
  );
}
