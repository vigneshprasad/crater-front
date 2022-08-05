import { useMemo } from "react";
import { useTheme } from "styled-components";

import { Box, Grid, Flex, Link, Text, Icon } from "@/common/components/atoms";
import { Creator } from "@/creators/types/creator";

import { HubNavItem, HubNavItemKeys, HUB_NAV_ITEMS } from ".";

interface IProps {
  creator: Creator | null;
  activeTab?: HubNavItemKeys;
}

export default function HubNav({ creator, activeTab }: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  const tabs = useMemo<HubNavItem[]>(() => {
    if (!creator) {
      return HUB_NAV_ITEMS.filter((item) => item.user !== false);
    }

    if (!creator.show_club_members && !creator.show_analytics) {
      return HUB_NAV_ITEMS.filter((item) => item.heading !== "Analytics");
    }

    return HUB_NAV_ITEMS;
  }, [creator]);

  return (
    <Box
      w={220}
      px={space.xxxs}
      h="max-content"
      bg={colors.primaryBackground}
      border={`1px solid ${colors.primaryLight}`}
    >
      {tabs.map(({ heading, items }, index) => {
        const lastIndex = tabs.length - 1;

        return (
          <Box
            pt={space.xs}
            py={space.xxs}
            borderBottom={
              index !== lastIndex ? `1px solid ${colors.primaryLight}` : null
            }
            key={index}
          >
            <Text
              px={space.xxxs}
              pb={space.xxxxs}
              textStyle="small"
              fontWeight={700}
              lineHeight="1.4rem"
              textTransform="uppercase"
              color="#959595"
            >
              {heading}
            </Text>
            {items.map(({ key, icon, route, label }) => {
              const active = key === activeTab;
              return (
                <Grid
                  gridAutoFlow="row"
                  gridAutoRows="max-content"
                  alignItems="center"
                  gridGap={space.xxs}
                  key={key}
                >
                  <Link href={route}>
                    <Flex
                      px={space.xxxs}
                      py={space.xxxxxs}
                      flexDirection="row"
                      alignItems="center"
                      gridGap={10}
                      bg={active ? colors.primaryLight : "inherit"}
                      borderRadius={radii.xxxxs}
                    >
                      <Icon
                        icon={icon}
                        size={15}
                        color={active ? colors.accentLight : "#EDEDED"}
                      />
                      <Text
                        textStyle="menu"
                        color={active ? colors.accentLight : "#EDEDED"}
                      >
                        {label}
                      </Text>
                    </Flex>
                  </Link>
                </Grid>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
