import { useTheme } from "styled-components";

import { Box, Grid, Text } from "@/common/components/atoms";

interface IProps {
  content: string;
}

export default function BulletPoint({ content }: IProps): JSX.Element {
  const { colors, space } = useTheme();
  return (
    <Grid
      gridTemplateColumns="max-content 1fr"
      gridGap={space.xxxs}
      alignItems="start"
    >
      <Box mt={4} w={6} h={6} borderRadius="50%" bg={colors.white[0]} />
      <Text textStyle="small">{content}</Text>
    </Grid>
  );
}
