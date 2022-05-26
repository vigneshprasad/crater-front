import { useTheme } from "styled-components";

import { Grid, Box, Text, GridProps } from "../../atoms";

interface IProps extends GridProps {
  label: string;
}

export default function HeadingDivider({
  label,
  ...rest
}: IProps): JSX.Element {
  const { colors, space } = useTheme();

  return (
    <Grid
      py={space.xxxs}
      gridTemplateColumns={["1fr ", "max-content 1fr"]}
      alignItems="center"
      gridGap={space.xxs}
      {...rest}
    >
      <Text
        display={["none", "block"]}
        color={colors.textSecondary}
        textStyle="caption"
        textTransform="uppercase"
      >
        {label}
      </Text>
      <Box h={1} bg={colors.black[0]} />
    </Grid>
  );
}
