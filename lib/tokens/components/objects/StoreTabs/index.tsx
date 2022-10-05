import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Flex, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { StoreTabKeys, STORE_ITEMS } from "@/tokens/types/store";

type IProps = {
  activeTab: StoreTabKeys;
};

export default function StoreTabs({ activeTab }: IProps): JSX.Element {
  const { space, colors, radii, fonts } = useTheme();
  const router = useRouter();

  return (
    <Flex mx="auto" w={[344, 736]} alignItems="center">
      <Flex
        flex={1}
        h={4}
        background="linear-gradient(-90deg, #292929 8.86%, rgba(27, 27, 27, 0) 80.91%)"
      />
      <Box
        px={space.xxxs}
        py={10}
        bg={colors.primaryDark}
        borderRadius={radii.xxxxs}
      >
        <Flex gridGap={space.xxxxs}>
          {STORE_ITEMS.map(({ key, route, label }) => {
            const active = activeTab === key;

            return (
              <Button
                key={key}
                w={132}
                h={52}
                variant={active ? "gradient-border-flat" : "primary-bg-flat"}
                bg={
                  active ? "rgba(136, 46, 232, 0.04)" : colors.primaryBackground
                }
                label={label}
                textProps={{
                  fontSize: "1.6rem",
                  fontWeight: 500,
                  fontFamily: fonts.heading,
                  color: colors.textTertiary,
                }}
                onClick={() => router.push(route)}
                position="relative"
                disabled={active ? false : true}
              >
                {!active && (
                  <Box
                    px={space.xxxxs}
                    py={space.xxxxxs}
                    bg={colors.primaryBanner}
                    position="absolute"
                    top={-20}
                    left={28}
                    borderRadius={2}
                  >
                    <Text textStyle="small" fontWeight={700}>
                      Coming Soon
                    </Text>
                  </Box>
                )}
              </Button>
            );
          })}
        </Flex>
      </Box>
      <Flex
        flex={1}
        h={4}
        background="linear-gradient(90deg, #292929 8.86%, rgba(27, 27, 27, 0) 80.91%)"
      />
    </Flex>
  );
}
