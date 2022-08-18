import { useTheme } from "styled-components";

import { Box, Flex, Text } from "@/common/components/atoms";

import StreamCompletionRateChart from "../StreamCompletionRateChart";

export default function StreamCompletionRateBox(): JSX.Element {
  const { space, colors, radii } = useTheme();

  return (
    <Box bg={colors.primaryDark} borderRadius={radii.xxxxs}>
      <Flex
        bg={colors.primaryLight}
        flexDirection="row"
        alignItems="center"
        borderRadius={`${radii.xxxxs}px ${radii.xxxxs}px 0px 0px`}
      >
        <Text
          p={`${space.xs}px 24px ${space.xs}px ${space.xxs}px`}
          textStyle="label"
          color={colors.accentLight}
          textTransform="uppercase"
        >
          Stream Completion Rate
        </Text>
        <Box p="4px 8px" bg="#FFD700" borderRadius={2}>
          <Text textStyle="small" fontWeight={700} color="#A80808">
            Coming Soon
          </Text>
        </Box>
      </Flex>
      <StreamCompletionRateChart />
    </Box>
  );
}
