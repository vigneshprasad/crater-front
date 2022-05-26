import styled, { useTheme } from "styled-components";

import { Box, Grid, Text, TextProps } from "../../atoms";

interface IProps {
  label: string;
}

const StyledText = styled(Text)<TextProps>`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  z-index: 1;

  &::before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 8px;
    bottom: -8px;
    left: -8px;
    right: 8px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

export default function StyledHeadingDivider({ label }: IProps): JSX.Element {
  const { colors, space, radii, fonts } = useTheme();
  return (
    <Grid
      my={space.s}
      mx={space.xs}
      gridTemplateColumns="max-content 1fr"
      alignItems="center"
      gridGap={space.xxs}
    >
      <Box position="relative">
        <StyledText
          as="div"
          p={space.xxxs}
          border={`1px solid ${colors.accent}`}
          borderRadius={radii.xxxxs}
          textStyle="title"
          fontFamily={fonts.heading}
          fontWeight="500"
        >
          {label}
        </StyledText>
      </Box>

      <Box h={2} bg={colors.primaryLight} />
    </Grid>
  );
}
