import { useTheme } from "styled-components";

import { Grid, Box, Flex, Icon, Text, Link } from "@/common/components/atoms";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

import MobileNav from "./MobileNav";
import { NAV_ITEMS, INavKeys } from "./constants";

interface IProps {
  activeTab?: INavKeys;
}

export function AsideNav({ activeTab }: IProps): JSX.Element | null {
  const { borders, space, breakpoints } = useTheme();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  if (isMobile) {
    return <MobileNav activeTab={activeTab} />;
  }

  return (
    <Grid
      py={space.xxxs}
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
            >
              <Box p={space.xxxxxs} position="relative">
                {active ? (
                  <>
                    <Box
                      w={48}
                      h={48}
                      position="absolute"
                      m="0 auto"
                      background="radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 100%)"
                      zIndex={-1}
                      style={{ backdropFilter: "blur(12px)" }}
                    />
                    <Icon icon={icon.active} size={44} h={44} />
                  </>
                ) : (
                  <Icon icon={icon.inactive} />
                )}
              </Box>

              {active && (
                <Text
                  fontSize={useSmallFont ? "0.8rem" : undefined}
                  textAlign="center"
                  textStyle="navbarLabel"
                >
                  {label}
                </Text>
              )}
            </Flex>
          </Link>
        );
      })}
    </Grid>
  );
}
