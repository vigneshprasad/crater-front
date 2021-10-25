import { useTheme } from "styled-components";

import { Grid, Text, Box, Link } from "../../atoms";

export interface BaseTabBarProps {
  tabs: string[];
  active?: string;
  baseUrl?: string;
}

export function BaseTabBar({
  tabs,
  active,
  baseUrl = "/",
}: BaseTabBarProps): JSX.Element {
  const { space, colors } = useTheme();
  return (
    <Grid
      px={[space.xs, space.s]}
      gridAutoFlow="column"
      gridAutoColumns="max-content"
      gridGap={space.xxs}
    >
      {tabs.map((tab) => (
        <Link href={`${baseUrl}${tab}`} key={tab}>
          <Box
            borderBottom="4px solid"
            pt={space.xxs}
            pb={space.xxxs}
            px={4}
            borderColor={active === tab ? colors.accent : "transparent"}
          >
            <Text textStyle="menu" textTransform="uppercase">
              {tab}
            </Text>
          </Box>
        </Link>
      ))}
    </Grid>
  );
}
