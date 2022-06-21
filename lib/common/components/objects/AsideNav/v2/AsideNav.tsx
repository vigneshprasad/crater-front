import { useTheme } from "styled-components";

import { Grid, Box, Flex, Icon, Text, Link } from "@/common/components/atoms";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

import MobileNav from "./MobileNav";
import { NAV_ITEMS, INavKeys } from "./constants";

interface IProps {
  activeTab?: INavKeys;
}

export function AsideNav({ activeTab }: IProps): JSX.Element | null {
  const { borders, space, colors, breakpoints } = useTheme();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  if (isMobile) {
    return <MobileNav activeTab={activeTab} />;
  }

  return (
    <Grid
      py={space.xxs}
      borderRight={`1px solid ${borders.primary}`}
      w={60}
      h="100%"
      gridAutoFlow="row"
      gridAutoRows="max-content"
      alignItems="center"
      gridGap={space.xxs}
    >
      {NAV_ITEMS.map(({ key, icon, label, route }) => {
        const active = key === activeTab;
        const useSmallFont = key === "leaderboard";
        return (
          <Link key={key} href={route}>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              color={active ? colors.accentLight : colors.slate}
            >
              <Box p={space.xxxxs}>
                <Icon color="inherit" icon={icon} />
              </Box>

              <Text
                fontSize={useSmallFont ? "0.8rem" : undefined}
                color="inherit"
                textAlign="center"
                textStyle="navbarLabel"
              >
                {label}
              </Text>
            </Flex>
          </Link>
        );
      })}
    </Grid>
  );
}
