import styled, { useTheme } from "styled-components";

import { Box, Grid, Text } from "../../atoms";

interface IProps {
  label: string;
}

const StyledText = styled(Text)`
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
    border: 1px solid ${({ theme }) => theme.colors.accentLight};
    background-color: ${({ theme }) => theme.colors.accentLight};
  }
`;

export default function StyledHeadingDivider({ label }: IProps): JSX.Element {
  const { colors, space, radii } = useTheme();
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
          border={`1px solid ${colors.accentLight}`}
          borderRadius={radii.xxxxs}
          textStyle="title"
        >
          {label}
        </StyledText>
      </Box>

      <Box h={2} bg={colors.black[0]} />
    </Grid>
  );
}
