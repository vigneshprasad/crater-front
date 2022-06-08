import styled, { useTheme } from "styled-components";

import { AnimatedBox, AnimatedBoxProps, Box, Text } from "../../atoms";

interface IProps extends AnimatedBoxProps {
  label?: string;
  suffixElement?: JSX.Element;
  prefixElement?: JSX.Element;
  children?: React.ReactNode | React.ReactNode[];
}

const Container = styled(AnimatedBox)`
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDarkSecondary};
  }
`;

export function MenuItem({
  label,
  suffixElement,
  prefixElement,
  children,
  ...rest
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Container
      display="grid"
      w="100%"
      gridGap={space.xxxs}
      gridTemplateAreas={`"menu-item-prefix menu-item-content menu-item-suffix"`}
      gridTemplateColumns="min-content 1fr min-content"
      px={space.xxxs}
      py={space.xxxxs}
      alignItems="center"
      variants={{
        opened: {
          display: "grid",
          opacity: 1,
        },
        closed: {
          opacity: 0,
          transitionEnd: {
            display: "none",
          },
        },
      }}
      {...rest}
    >
      <Box gridArea="menu-item-prefix">{prefixElement}</Box>

      <Box gridArea="menu-item-content">
        {children && <>{children}</>}
        {label && <Text textStyle="tabLabel">{label}</Text>}
      </Box>
      <Box gridArea="menu-item-suffix">{suffixElement}</Box>
    </Container>
  );
}
