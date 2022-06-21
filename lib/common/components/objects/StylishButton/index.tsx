import styled, { useTheme } from "styled-components";

import { Grid, Box, BoxProps, Text } from "../../atoms";

interface IProps extends BoxProps {
  label: string;
  prefixElement?: React.ReactNode;
  suffixElement?: React.ReactNode;
}

const Container = styled(Grid)`
  background: ${({ theme }) => theme.colors.primaryLight};
  z-index: 1;
  transition: all 0.2s ease-in;

  &:hover {
    transform: translate(8px, -8px);
  }
`;

const Shadow = styled(Box)``;

export default function StylishButton({
  label,
  prefixElement,
  suffixElement,
  ...rest
}: IProps): JSX.Element {
  const { colors, space, radii } = useTheme();
  return (
    <Box cursor="pointer" position="relative" {...rest}>
      <Shadow
        zIndex={-1}
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        background={colors.primaryLight}
        border={`1px solid ${colors.accentLight}`}
        borderRadius={radii.xxxxs}
      />
      <Container
        p={space.xxxs}
        border={`1px solid ${colors.accentLight}`}
        borderRadius={radii.xxxxs}
        gridTemplateColumns="max-content 1fr max-content"
        gridTemplateAreas={`"sty-btn-prefix sty-btn-content sty-btn-suffix`}
      >
        <Box gridArea="sty-btn-prefix">{prefixElement}</Box>
        <Text gridArea="sty-btn-content" textStyle="title">
          {label}
        </Text>
        <Box gridArea="sty-btn-suffix">{suffixElement}</Box>
      </Container>
    </Box>
  );
}
