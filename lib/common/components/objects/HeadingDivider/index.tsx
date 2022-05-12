import { useTheme } from "styled-components";

import { Grid, Box, Text } from "../../atoms";

interface IProps {
  label: string;
}

export default function HeadingDivider({ label }: IProps): JSX.Element {
  const { colors, space } = useTheme();

  return (
    <Grid
      py={space.xxxs}
      gridTemplateColumns="max-content 1fr"
      alignItems="center"
      gridGap={space.xxs}
    >
      <Text
        color={colors.textSecondary}
        textStyle="caption"
        textTransform="uppercase"
        bg={colors.primaryLight}
      >
        {label}
      </Text>
      <Box h={1} bg={colors.black[0]} />
    </Grid>
  );
}
