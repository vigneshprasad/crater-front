import { useTheme } from "styled-components";

import { Box, Shimmer, Text } from "@/common/components/atoms";
import { StreamCompletionRate } from "@/creators/types/creator";

import StreamCompletionRateChart from "../StreamCompletionRateChart";

type IProps = {
  streamCompletionData?: StreamCompletionRate[];
};

export default function StreamCompletionRateBox({
  streamCompletionData,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  return (
    <Box bg={colors.primaryDark} borderRadius={radii.xxxxs}>
      <Text
        p={`${space.xs}px 24px ${space.xs}px ${space.xxs}px`}
        textStyle="label"
        color={colors.accentLight}
        textTransform="uppercase"
        bg={colors.primaryLight}
        borderRadius={`${radii.xxxxs}px ${radii.xxxxs}px 0px 0px`}
      >
        Stream Completion Rate
      </Text>

      {(() => {
        if (streamCompletionData === undefined) {
          return <Shimmer w="100%" h={300} />;
        }

        return (
          <StreamCompletionRateChart
            streamCompletionData={streamCompletionData}
          />
        );
      })()}
    </Box>
  );
}
